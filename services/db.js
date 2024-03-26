const { Pool } = require('pg');

const pool = new Pool({
  // user: 'poxtajjp',
  // database: 'poxtajjp',
  // host: 'cornelius.db.elephantsql.com',
  // password: process.env.DB_PW,
  // port: 5432,
  connectionString: process.env.CONNECTION_URI,
});
const query = async (text, params) => {
  // const start = Date.now();
  const res = await pool.query(text, params);
  // const duration = Date.now() - start;
  // console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
};

module.exports = { query };
