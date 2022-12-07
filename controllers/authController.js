const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Signup route
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

// Login route
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

// Protected route
const protectedRoute = catchAsync(async (req, res, next) => {
  let token;
  //Getting token and check if its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  //Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  //Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    next(
      new AppError('The user belonging to this token does no longer exist.'),
      401
    );
  }
  //Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  //Grant access to the protected route
  req.user = freshUser;
  next();
});

// Restrict middleware
const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };

// Forgot password method
const forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new AppError('There is no user with this email address', 404));
  }
  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });
  res.status(200).json({ status: 'success', resetToken });
});
// Reset password method
const resetPassword = catchAsync(async (req, res, next) => {
  //
});
module.exports = {
  login,
  signUp,
  protectedRoute,
  restrictTo,
  forgotPassword,
  resetPassword,
};
