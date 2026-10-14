// Placing orders and reading them back
// Replaces the Razorpay flow (/payment, /payment_success, /order_confirmation, /place_order).
// UPI is gone: the only payment methods are Cash on Delivery and Card.

const express = require('express');
const db = require('../db');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

const PAYMENT_METHODS = ['Cash on Delivery', 'Card'];

// POST /api/place_order  { shipping_address, payment_method, card_last4 }
// Saves the order + order items, lowers the stock and empties the cart
// in ONE transaction, so the database is never left half-updated.
router.post('/place_order', requireLogin('Please log in to place an order.'), async (req, res) => {
  const userId = req.session.userId;
  const shippingAddress = (req.body.shipping_address || '').trim();
  const paymentMethod = req.body.payment_method;
  const cardLast4 = req.body.card_last4 ? String(req.body.card_last4) : null;

  if (!shippingAddress) {
    return res.status(400).json({ status: 'error', message: 'Please enter a shipping address.' });
  }
  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    return res.status(400).json({ status: 'error', message: 'Please choose Cash on Delivery or Card.' });
  }
  if (paymentMethod === 'Card' && !/^\d{4}$/.test(cardLast4 || '')) {
    return res.status(400).json({ status: 'error', message: 'Card details are missing.' });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Read the cart. FOR UPDATE locks these rows until we commit.
    const [items] = await connection.query(
      `SELECT c.product_id, c.quantity, p.product_name, p.price, p.stock_quantity
       FROM cart c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.user_id = ?
       FOR UPDATE`,
      [userId]
    );

    if (items.length === 0) {
      await connection.rollback();
      return res.status(400).json({ status: 'error', message: 'Your cart is empty. Add some products first.' });
    }

    // 2. Make sure there is enough stock for everything
    for (const item of items) {
      if (item.quantity > item.stock_quantity) {
        await connection.rollback();
        return res.status(400).json({
          status: 'error',
          message: `Only ${item.stock_quantity} left of ${item.product_name}. Please update your cart.`
        });
      }
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const paymentStatus = paymentMethod === 'Card' ? 'Complete' : 'Pending'; // cash is paid on delivery

    // 3. Save the order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_price, shipping_address, payment_method, card_last4, payment_status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, total.toFixed(2), shippingAddress, paymentMethod, paymentMethod === 'Card' ? cardLast4 : null, paymentStatus]
    );
    const orderId = orderResult.insertId;

    // 4. Save every item and lower the stock
    for (const item of items) {
      await connection.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [
        orderId,
        item.product_id,
        item.quantity,
        item.price
      ]);
      await connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?', [
        item.quantity,
        item.product_id
      ]);
    }

    // 5. Empty the cart
    await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);

    // 6. Remember the address on the profile if the user has none yet
    await connection.query(
      "UPDATE users SET address = ? WHERE user_id = ? AND (address IS NULL OR address = '')",
      [shippingAddress, userId]
    );

    await connection.commit();
    res.json({ status: 'success', message: 'Order placed successfully!', order_id: orderId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ status: 'error', message: `Error placing order: ${err.message}` });
  } finally {
    connection.release();
  }
});

// Reads the items of several orders and attaches them to each order
async function attachItems(orders) {
  if (orders.length === 0) return orders;

  const orderIds = orders.map((order) => order.order_id);
  const [items] = await db.query(
    `SELECT oi.order_id, oi.product_id, oi.quantity, oi.price, p.product_name, p.image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.product_id
     WHERE oi.order_id IN (?)
     ORDER BY oi.order_item_id`,
    [orderIds]
  );

  return orders.map((order) => ({
    ...order,
    items: items.filter((item) => item.order_id === order.order_id)
  }));
}

// GET /api/order_confirmation/:order_id
router.get('/order_confirmation/:order_id', requireLogin(), async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE order_id = ? AND user_id = ?', [
      req.params.order_id,
      req.session.userId
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No order information found.' });
    }

    const [order] = await attachItems(orders);
    res.json({ order });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/my_orders  -> order history for the account page
router.get('/my_orders', requireLogin(), async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC', [
      req.session.userId
    ]);
    res.json({ orders: await attachItems(orders) });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
