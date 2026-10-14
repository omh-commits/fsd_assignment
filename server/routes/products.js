// Product listing and product details
// Flask routes replaced: /products, /products/<category>/<subcategory>, /product/<id>

const express = require('express');
const db = require('../db');

const router = express.Router();

// Allowed values for ?sort_by=  (a fixed list keeps the SQL safe)
const SORT_OPTIONS = {
  price_high_to_low: 'price DESC',
  price_low_to_high: 'price ASC',
  name_a_to_z: 'product_name ASC',
  name_z_to_a: 'product_name DESC'
};

// Builds one SELECT for all the filters the shop page can use
async function findProducts({ category, subcategory, search, sortBy }) {
  let sql = 'SELECT * FROM products WHERE 1 = 1';
  const values = [];

  if (category) {
    sql += ' AND category = ?';
    values.push(category);
  }
  if (subcategory) {
    sql += ' AND subcategory = ?';
    values.push(subcategory);
  }
  if (search) {
    sql += ' AND (product_name LIKE ? OR description LIKE ?)';
    values.push(`%${search}%`, `%${search}%`);
  }

  sql += ' ORDER BY ' + (SORT_OPTIONS[sortBy] || 'product_id ASC');

  const [rows] = await db.query(sql, values);
  return rows;
}

// GET /api/products?category=&subcategory=&search=&sort_by=
router.get('/products', async (req, res) => {
  try {
    const products = await findProducts({
      category: req.query.category,
      subcategory: req.query.subcategory,
      search: req.query.search,
      sortBy: req.query.sort_by
    });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching products: ${err.message}` });
  }
});

// GET /api/products/:category/:subcategory?sort_by=   (same as the old Flask route)
router.get('/products/:category/:subcategory', async (req, res) => {
  try {
    const products = await findProducts({
      category: req.params.category,
      subcategory: req.params.subcategory,
      sortBy: req.query.sort_by
    });
    res.json({
      products,
      category: req.params.category,
      subcategory: req.params.subcategory,
      sort_by: req.query.sort_by || 'default'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching products: ${err.message}` });
  }
});

// GET /api/product/:product_id
router.get('/product/:product_id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [req.params.product_id]);

    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }
    res.json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error fetching product details: ${err.message}` });
  }
});

module.exports = router;
