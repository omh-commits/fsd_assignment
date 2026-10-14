// Leafy Village v2 - Express server
// Start with: npm start   (or npm run dev to restart on file changes)

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db');
const dbSettings = require('./dbSettings');
const { setupIfEmpty } = require('./setup-db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const accountRoutes = require('./routes/account');
const contactRoutes = require('./routes/contact');
const subadminRoutes = require('./routes/subadmin');
const headadminRoutes = require('./routes/headadmin');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// On Render the app sits behind a proxy that handles HTTPS
app.set('trust proxy', 1);

// Read JSON bodies and normal form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login sessions are saved in the MySQL "sessions" table, so nobody is logged out
// when the server restarts (Render's free plan sleeps after 15 minutes).
const sessionStore = new MySQLStore({}, mysql.createPool({ ...dbSettings, connectionLimit: 3 }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-this-secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction, // only send the cookie over HTTPS on the live site
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// Log every request, like @app.before_request in the Flask app
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl} Method: ${req.method}`);
  next();
});

// Product images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', accountRoutes);
app.use('/api', contactRoutes);
app.use('/api/subadmin', subadminRoutes);
app.use('/api/headadmin', headadminRoutes);

// Unknown API route
app.use('/api', (req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found.' });
});

// After "npm run build" in the client folder, Express can serve the React app too
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => res.sendFile(path.join(clientBuild, 'index.html')));
}

// Last stop for errors (for example a bad file upload)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ status: 'error', message: err.message || 'Something went wrong.' });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await db.query('SELECT 1');
    console.log('Connected to MySQL database:', dbSettings.database);
    await setupIfEmpty(db);
  } catch (err) {
    console.error('Could not connect to MySQL:', err.message);
    console.error('Check that MySQL is running and the database settings (server/.env) are correct.');
  }
});
