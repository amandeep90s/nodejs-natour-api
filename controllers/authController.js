const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // Check if user is existed and password is correct
  const user = await User.findOne({ email }).select('+password');
  const validPassword = await user.correctPassword(password, user.password);
  if (!user || !validPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});
module.exports = { login, signUp };
