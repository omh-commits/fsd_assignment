// MySQL connection pool.
// Every route file does: const db = require('../db');
// and then: const [rows] = await db.query('SELECT ...', [values]);

const mysql = require('mysql2/promise');
const dbSettings = require('./dbSettings');

const db = mysql.createPool({
  ...dbSettings,
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true // return DECIMAL columns (like price) as numbers, not strings
});

module.exports = db;
