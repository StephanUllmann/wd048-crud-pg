const { body, validationResult } = require('express-validator');

// const validateTitle = (req, res, next) => {
//   const { title } = req.body;

//   if (typeof title !== 'string') {
//     return res.status(400).json({ error: 'Title needs to be a string' });
//   }

//   next();
// };

// const validateTitle = () =>
//   body('title').isString().isLength({ min: 1, max: 12 }).withMessage('Title needs to have 1 to 12 characters');

const validationChain = [
  body('title').isString().isLength({ min: 1, max: 12 }).withMessage('Title needs to have 1 to 12 characters'),

  body('content').exists().withMessage('Content is required').isString().withMessage('Content needs to be a string'),

  body('author')
    .exists()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author needs to be a string')
    .isLength({ max: 42 })
    .withMessage('Author Name too long')
    .toLowerCase(),

  // body("email").isEmail()
];

const checkValidation = (req, res, next) => {
  const valRes = validationResult(req);
  if (valRes.isEmpty()) {
    next();
  } else {
    res.status(400).json({ error: valRes.array() });
  }
};

const validateArticle = [...validationChain, checkValidation];

module.exports = { validateArticle };
