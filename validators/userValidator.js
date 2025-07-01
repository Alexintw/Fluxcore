const { body } = require('express-validator');
exports.registerRules = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password min length 6').isLength({ min: 6 }),
];
exports.loginRules = [
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password is required').exists(),
];