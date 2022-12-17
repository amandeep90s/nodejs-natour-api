const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Filter request body
const filterRequestBody = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((item) => {
    if (allowedFields.includes(item)) {
      newObject[item] = obj[item];
    }
  });
  return newObject;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

const createUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });

const getUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });

const updateUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });

// Delete user by admin method
const deleteUser = factory.deleteOne(User);

// Update the logged in user details
const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for update password', 400));
  }
  const filterBody = filterRequestBody(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Delete the logged in user
const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
};
