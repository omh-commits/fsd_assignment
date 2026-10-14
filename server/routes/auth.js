// Register, login, logout and "who am I"
// Flask routes replaced: /register, /login, /logout

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

// POST /api/register  { username, email, password }
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ status: 'error', message: 'All fields are required!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      email
    ]);
    res.json({ status: 'success', message: 'Registration successful! Please log in.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ status: 'error', message: 'That username or email is already registered.' });
    }
    res.status(500).json({ status: 'error', message: `Registration failed: ${err.message}` });
  }
});

// POST /api/login  { username, password }
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Both fields are required!' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
    }

    // Save the user in the session
    req.session.userId = user.user_id;
    req.session.username = user.username;
    req.session.userEmail = user.email;

    res.json({
      status: 'success',
      message: 'Login successful!',
      user: { user_id: user.user_id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Login failed: ${err.message}` });
  }
});

// GET /api/logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ status: 'success', message: 'You have been logged out.' });
  });
});

// GET /api/me  -> the logged in user, or null
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }
  res.json({
    user: { user_id: req.session.userId, username: req.session.username, email: req.session.userEmail }
  });
});

module.exports = router;
