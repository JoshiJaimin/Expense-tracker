// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Attempt to connect once at startup
pool.on("error", (err) => {
  console.log("err in pool")
  process.exit(-1)
})

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

module.exports = pool;
