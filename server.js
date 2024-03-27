const express = require('express');
require('colors');
require('dotenv').config();
const cors = require('cors');
const { query } = require('./services/db.js');

// const { seedDB } = require('./services/seedDB.js');
// seedDB();

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const result = await query('SELECT NOW();', []);
  // console.log(result);
  const now = result.rows[0].now;
  res.send(`It is ${now}`);
});

// CRUD operations

// Get all articles
app.get('/articles', async (req, res) => {
  try {
    const { rows, rowCount } = await query('SELECT * FROM articles;');
    if (rowCount === 0) {
      return res.status(404).json({ message: 'No articles found' });
    }
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article
app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await query('SELECT * FROM articles WHERE id = $1;', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Article found' });
    }
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an article
app.post('/articles', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const { rows, rowCount } = await query(
      'INSERT INTO articles (title, content, author) VALUES ($1, $2, $3) RETURNING *;',
      [title, content, author]
    );
    // console.log(rows, rowCount);
    if (rowCount === 0) {
      throw new Error('Posting article failed');
    }
    res.status(201).json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article
app.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const { rows, rowCount } = await query(
      'UPDATE articles SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *;',
      [title, content, author, id]
    );
    if (rowCount === 0) {
      throw new Error('Updating article failed');
    }
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article
app.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await query('DELETE FROM articles WHERE id = $1 RETURNING *;', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    // res.status(200)
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`CRUD app listening on http://localhost:${port}`.bgGreen);
});
