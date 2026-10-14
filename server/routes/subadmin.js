// Sub-admin API (was admin_app/admin_app.py)
// There are no pages for these routes in the React site; use Postman, Thunder Client or curl.
// All routes start with /api/subadmin

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireSubadmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/subadmin/register  { username, email, password }
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ status: 'error', message: 'All fields are required!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO subadmins (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword
    ]);
    res.json({ status: 'success', message: 'Registration successful! You can now log in.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ status: 'error', message: 'Email already registered.' });
    }
    res.status(500).json({ status: 'error', message: `Error: ${err.message}` });
  }
});

// POST /api/subadmin/login  { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM subadmins WHERE email = ?', [email]);
    const subadmin = rows[0];

    if (!subadmin) {
      return res.status(401).json({
        status: 'error',
        message: 'No subadmin found with this email. Please check your credentials.'
      });
    }
    if (!(await bcrypt.compare(password, subadmin.password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid password. Please try again.' });
    }

    req.session.subadminId = subadmin.subadmin_id;
    req.session.subadminUsername = subadmin.username;
    res.json({ status: 'success', message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `An error occurred while processing your request: ${err.message}` });
  }
});

// GET /api/subadmin/dashboard
router.get('/dashboard', requireSubadmin, (req, res) => {
  res.json({ username: req.session.subadminUsername });
});

// POST /api/subadmin/add_product
router.post('/add_product', requireSubadmin, async (req, res) => {
  const { product_name, description, price, stock_quantity, category, subcategory, image_url, steps_to_grow } = req.body;

  if (!product_name || !description || !price || stock_quantity === undefined || !category || !subcategory || !image_url) {
    return res.status(400).json({ status: 'error', message: "All fields except 'steps_to_grow' are required!" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO products
       (product_name, description, price, stock_quantity, category, subcategory, image_url, steps_to_grow)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [product_name, description, price, stock_quantity, category, subcategory, image_url, steps_to_grow || null]
    );
    res.json({ status: 'success', message: 'Product added successfully!', product_id: result.insertId });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error: ${err.message}` });
  }
});

// GET /api/subadmin/manage_products  (newest first)
router.get('/manage_products', requireSubadmin, async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products ORDER BY product_id DESC');
    res.json({ products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching products: ${err.message}` });
  }
});

// POST /api/subadmin/update_product/:product_id
router.post('/update_product/:product_id', requireSubadmin, async (req, res) => {
  const { product_name, image_url, price, stock, description, steps_to_grow } = req.body;

  if (!product_name || !image_url || !price || stock === undefined || stock === '' || !description) {
    return res.status(400).json({ status: 'error', message: "All fields except 'steps_to_grow' are required!" });
  }

  try {
    const [result] = await db.query(
      `UPDATE products
       SET product_name = ?, image_url = ?, price = ?, stock_quantity = ?, description = ?, steps_to_grow = ?
       WHERE product_id = ?`,
      [product_name, image_url, price, stock, description, steps_to_grow || null, req.params.product_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found!' });
    }
    res.json({ status: 'success', message: 'Product updated successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error: ${err.message}` });
  }
});

// POST or DELETE /api/subadmin/delete_product/:product_id
async function deleteProduct(req, res) {
  try {
    const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [req.params.product_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found!' });
    }
    res.json({ status: 'success', message: 'Product deleted successfully!' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        status: 'error',
        message: 'Error deleting product: it is part of past orders. Set its stock to 0 instead.'
      });
    }
    res.status(500).json({ status: 'error', message: `Error deleting product: ${err.message}` });
  }
}
router.post('/delete_product/:product_id', requireSubadmin, deleteProduct);
router.delete('/delete_product/:product_id', requireSubadmin, deleteProduct);

// GET /api/subadmin/view_messages  (contact form messages, newest first)
router.get('/view_messages', requireSubadmin, async (req, res) => {
  try {
    const [messages] = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching messages: ${err.message}` });
  }
});

// GET /api/subadmin/orders  (one row per ordered product, newest order first)
router.get('/orders', requireSubadmin, async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.order_id, o.user_id, u.username, u.email, oi.product_id, p.product_name,
              oi.price, oi.quantity, o.shipping_address AS address,
              o.payment_method, o.payment_status, o.order_status, o.created_at
       FROM orders o
       JOIN order_items oi ON o.order_id = oi.order_id
       JOIN products p ON oi.product_id = p.product_id
       JOIN users u ON o.user_id = u.user_id
       ORDER BY o.order_id DESC`
    );
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error loading orders: ${err.message}` });
  }
});

// GET /api/subadmin/logout
router.get('/logout', (req, res) => {
  delete req.session.subadminId;
  delete req.session.subadminUsername;
  res.json({ status: 'success', message: 'Logged out successfully!' });
});

module.exports = router;
