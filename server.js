const express = require('express');
require('colors');
require('dotenv').config();
const cors = require('cors');
const { query } = require('./services/db.js');

const { articlesRouter } = require('./routes/articles.js');

// const { seedDB } = require('./services/seedDB.js');
// seedDB();

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

const myGreetingMiddleware = (req, res, next) => {
  console.log(new Date());
  next();
};
// app.use(myGreetingMiddleware);

app.get('/', async (req, res) => {
  const result = await query('SELECT NOW();', []);
  // console.log(result);
  const now = result.rows[0].now;
  res.send(`It is ${now}`);
});

app.use('/articles', myGreetingMiddleware, articlesRouter);

app.listen(port, () => {
  console.log(`CRUD app listening on http://localhost:${port}`.bgGreen);
});
