// Contact form messages
// Flask route replaced: /contact (POST)

const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/contact  { name, email, message }
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'Please fill out all fields.' });
  }

  try {
    await db.query('INSERT INTO messages (user_name, user_email, user_message) VALUES (?, ?, ?)', [name, email, message]);
    res.json({ status: 'success', message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error submitting message: ${err.message}` });
  }
});

module.exports = router;
