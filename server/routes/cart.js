// Shopping cart
// Flask routes replaced: /add_to_cart, /cart, /remove_from_cart/<id>

const express = require('express');
const db = require('../db');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

// POST /api/add_to_cart  { product_id, quantity }
router.post('/add_to_cart', requireLogin('Please log in to add items to your cart.'), async (req, res) => {
  const productId = Number(req.body.product_id);
  // Quantity is 1 when it is not sent at all (like the Flask default), otherwise use what was sent
  const quantity = req.body.quantity === undefined || req.body.quantity === '' ? 1 : Number(req.body.quantity);
  const userId = req.session.userId;

  if (!productId || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ status: 'error', message: 'Please choose a product and a quantity of at least 1.' });
  }

  try {
    // Does the product exist?
    const [products] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    const product = products[0];
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    // Is it already in the cart?
    const [cartRows] = await db.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
    const alreadyInCart = cartRows.length > 0 ? cartRows[0].quantity : 0;

    if (alreadyInCart + quantity > product.stock_quantity) {
      return res.status(400).json({
        status: 'error',
        message: `Sorry, only ${product.stock_quantity} in stock (you already have ${alreadyInCart} in your cart).`
      });
    }

    if (alreadyInCart > 0) {
      await db.query('UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [
        quantity,
        userId,
        productId
      ]);
    } else {
      await db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }

    res.json({ status: 'success', message: 'Product added to cart!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/cart
router.get('/cart', requireLogin('Please log in to view your cart.'), async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.product_id, p.product_name, p.price, p.image_url, p.stock_quantity, c.quantity
       FROM cart c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.user_id = ?
       ORDER BY c.cart_id`,
      [req.session.userId]
    );

    // Math.round(x * 100) / 100 keeps money at 2 decimal places
    const cart = rows.map((item) => ({ ...item, total_price: Math.round(item.price * item.quantity * 100) / 100 }));
    const total = Math.round(cart.reduce((sum, item) => sum + item.total_price, 0) * 100) / 100;

    res.json({ cart, total });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching cart: ${err.message}` });
  }
});

// POST /api/remove_from_cart/:product_id
router.post('/remove_from_cart/:product_id', requireLogin('Please log in to remove items from your cart.'), async (req, res) => {
  try {
    await db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [req.session.userId, req.params.product_id]);
    res.json({ status: 'success', message: 'Item removed from cart!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error removing item from cart: ${err.message}` });
  }
});

module.exports = router;
