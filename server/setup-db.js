// Creates the tables and the sample products from database/schema.sql and database/seed.sql.
//
//   npm run db:setup   -> runs both files now. WARNING: this deletes all existing data.
//   server start       -> runs them only if the "products" table does not exist yet,
//                         so a brand-new hosted database is filled in automatically.

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dbSettings = require('./dbSettings');

function readSqlFile(name) {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'database', name), 'utf8');
  // The database is already chosen in the settings, so skip "CREATE DATABASE ..." and "USE ..."
  return sql.replace(/CREATE DATABASE[\s\S]*?;/i, '').replace(/^USE\s+\w+;/im, '');
}

async function runSetup() {
  const connection = await mysql.createConnection({ ...dbSettings, multipleStatements: true });
  try {
    await connection.query(readSqlFile('schema.sql'));
    await connection.query(readSqlFile('seed.sql'));
  } finally {
    await connection.end();
  }
}

async function setupIfEmpty(db) {
  const [tables] = await db.query("SHOW TABLES LIKE 'products'");
  if (tables.length === 0) {
    console.log('No tables found. Creating them and adding the sample products...');
    await runSetup();
    console.log('Database is ready.');
  }
}

module.exports = { runSetup, setupIfEmpty };

// When run directly with "npm run db:setup"
if (require.main === module) {
  runSetup()
    .then(() => {
      console.log('Tables created and sample products added.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Database setup failed:', err.message);
      process.exit(1);
    });
}
