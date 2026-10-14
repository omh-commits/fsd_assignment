// "My Account": read and update the profile, including a profile picture
// Flask route replaced: /my_account (GET + POST)
//
// Profile pictures are saved inside the users table (picture_data column), not on disk,
// because free hosting like Render wipes its disk on every restart.

const path = require('path');
const express = require('express');
const multer = require('multer');
const db = require('../db');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif'];

// Keep the uploaded file in memory so it can be saved into MySQL.
// The React page shrinks the picture before uploading, so it is usually only a few KB.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 }, // 500 KB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only png, jpg, jpeg and gif images are allowed.'));
    }
  }
});

// Never send the password hash (or the raw picture bytes) to the browser
function publicUser(user) {
  const { password, picture_data, picture_type, ...rest } = user;
  return rest;
}

// "" from an empty form field becomes NULL in the database
function emptyToNull(value) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === '' ? null : text;
}

// GET /api/my_account
router.get('/my_account', requireLogin(), async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.session.userId]);
    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }
    res.json({ user: publicUser(rows[0]) });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/my_account  (multipart form: first_name, last_name, phone, gender, address, profile_picture)
router.post('/my_account', requireLogin(), upload.single('profile_picture'), async (req, res) => {
  const userId = req.session.userId;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    // Keep the old value when a field was not sent (like request.form.get('x', user.x))
    const pick = (field) => (req.body[field] !== undefined ? req.body[field] : user[field]);

    let gender = pick('gender');
    if (gender !== 'Male' && gender !== 'Female') gender = null;

    await db.query(
      `UPDATE users
       SET first_name = ?, last_name = ?, phone = ?, gender = ?, address = ?
       WHERE user_id = ?`,
      [
        emptyToNull(pick('first_name')),
        emptyToNull(pick('last_name')),
        emptyToNull(pick('phone')),
        gender,
        emptyToNull(pick('address')),
        userId
      ]
    );

    // Save the new picture. "?v=..." changes every time so the browser shows the new one.
    if (req.file) {
      await db.query(
        'UPDATE users SET picture_data = ?, picture_type = ?, profile_picture = ? WHERE user_id = ?',
        [req.file.buffer, req.file.mimetype, `/api/profile_picture?v=${Date.now()}`, userId]
      );
    }

    const [updated] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    res.json({ status: 'success', message: 'Profile updated successfully!', user: publicUser(updated[0]) });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ status: 'error', message: 'That phone number is already used by another account.' });
    }
    res.status(500).json({ status: 'error', message: `Error updating profile: ${err.message}` });
  }
});

// GET /api/profile_picture  -> the logged in user's own picture
router.get('/profile_picture', requireLogin(), async (req, res) => {
  try {
    const [rows] = await db.query('SELECT picture_data, picture_type FROM users WHERE user_id = ?', [
      req.session.userId
    ]);
    if (rows.length === 0 || !rows[0].picture_data) {
      return res.status(404).json({ status: 'error', message: 'No profile picture.' });
    }
    res.type(rows[0].picture_type).send(rows[0].picture_data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
