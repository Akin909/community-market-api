const { Pool } = require('pg');
const url = require('url');

require('dotenv').config({ path: './config.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('No Database URL');
}

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 19,
  ssl: params.hostname !== 'localhost',
  idleTimeoutMillis: process.env.NODE_ENV === 'dev' ? 1000 : 30000,
};

if (username) {
  options.user = username;
}

if (password) {
  options.password = password;
}

module.exports = new Pool(options);
