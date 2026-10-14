// Reads the MySQL connection settings from environment variables.
// Locally they come from server/.env (or the XAMPP defaults below).
// On Render they are typed into the dashboard.
//
// Two ways to configure the database:
//   1. DATABASE_URL=mysql://user:password@host:port/database   (one line, what Aiven calls "Service URI")
//   2. DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME          (separate values)
//
// Hosted databases need an encrypted (SSL) connection:
//   DB_CA_CERT = the "CA certificate" text from the database provider (Aiven)
//   DB_SSL=true = use SSL with a normal public certificate (other providers)

require('dotenv').config();

function readSettings() {
  let settings;

  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    settings = {
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace('/', '') || 'leafy_village'
    };
  } else {
    settings = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'leafy_village'
    };
  }

  if (process.env.DB_CA_CERT) {
    // Some dashboards save line breaks as "\n" text, so turn them back into real line breaks
    settings.ssl = { ca: process.env.DB_CA_CERT.replace(/\\n/g, '\n'), rejectUnauthorized: true };
  } else if (process.env.DB_SSL === 'true') {
    settings.ssl = { rejectUnauthorized: true };
  }

  return settings;
}

module.exports = readSettings();
