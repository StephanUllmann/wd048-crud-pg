const { query } = require('../services/db.js');
const { validationResult } = require('express-validator');

const getAllArticles = async (req, res) => {
  try {
    const { rows, rowCount } = await query('SELECT * FROM articles;');
    if (rowCount === 0) {
      return res.status(404).json({ message: 'No articles found' });
    }
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleArticle = async (req, res) => {
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
};

const createArticle = async (req, res) => {
  // const valRes = validationResult(req);
  // if (!valRes.isEmpty()) {
  //   console.log(valRes);
  //   return res.status(400);
  // }

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
};

const updateArticle = async (req, res) => {
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
};

const deleteArticle = async (req, res) => {
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
};

module.exports = { getAllArticles, getSingleArticle, createArticle, updateArticle, deleteArticle };
