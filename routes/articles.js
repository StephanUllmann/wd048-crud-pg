const { Router } = require('express');
const {
  getAllArticles,
  getSingleArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articles.js');

const { validateArticle } = require('../middlewares/validate.js');

const articlesRouter = Router();

// CRUD operations

// Get all articles
articlesRouter.get('/', getAllArticles);

// Get single article
articlesRouter.get('/:id', getSingleArticle);

// Create an article
articlesRouter.post('/', validateArticle, createArticle);

// Update article
articlesRouter.put('/:id', updateArticle);

// Delete article
articlesRouter.delete('/:id', deleteArticle);

module.exports = { articlesRouter };
