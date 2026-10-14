// Head-admin API (was headadmin_app/headadmin_app.py)
// There are no pages for these routes in the React site; use Postman, Thunder Client or curl.
// All routes start with /api/headadmin

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireHeadadmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/headadmin/register  { username, email, password }
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ status: 'error', message: 'All fields are required!' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM headadmins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ status: 'error', message: 'Email already registered' });
    }

    // The Flask version stored plain passwords; here they are hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO headadmins (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword
    ]);
    res.json({ status: 'success', message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/headadmin/login  { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM headadmins WHERE email = ?', [email || '']);
    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(password || '', admin.password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid Credentials' });
    }

    req.session.headadminEmail = admin.email;
    res.json({ status: 'success', message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/headadmin/dashboard
router.get('/dashboard', requireHeadadmin, (req, res) => {
  res.json({ email: req.session.headadminEmail });
});

// GET /api/headadmin/users
router.get('/users', requireHeadadmin, async (req, res) => {
  try {
    const [users] = await db.query('SELECT user_id, username, email FROM users ORDER BY user_id');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/headadmin/subadmins
router.get('/subadmins', requireHeadadmin, async (req, res) => {
  try {
    const [subadmins] = await db.query('SELECT subadmin_id, username, email FROM subadmins ORDER BY subadmin_id');
    res.json({ subadmins });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/headadmin/logout
router.get('/logout', (req, res) => {
  delete req.session.headadminEmail;
  res.json({ status: 'success', message: 'Logged out.' });
});

module.exports = router;
