const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// @route GET /api/users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ success: true, data: users });
});

// @route POST /api/users
exports.createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ success: true, data: user });
});

// @route GET /api/users/:id
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  res.json({ success: true, data: user });
});

// @route PUT /api/users/:id
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  res.json({ success: true, data: user });
});

// @route DELETE /api/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  res.json({ success: true, message: 'User deleted' });
});