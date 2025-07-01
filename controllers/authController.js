const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn } = require('../config/auth');
const asyncHandler = require('../middleware/asyncHandler');

// @route POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) throw Object.assign(new Error('User already exists'), { statusCode: 400 });
  user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const payload = { user: { id: user.id } };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  res.status(201).json({ success: true, token });
});

// @route POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 400 });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Object.assign(new Error('Invalid credentials'), { statusCode: 400 });
  const payload = { user: { id: user.id } };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  res.json({ success: true, token });
});