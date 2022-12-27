const multer = require('multer');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Upload user photo middleware
const uploadUserPhoto = upload.single('photo');

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

// Create user method
const createUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead.',
  });

// Get all users method
const getAllUsers = factory.getAll(User);

// Get user detail method
const getUser = factory.getOne(User);

// Update user detail method
const updateUser = factory.updateOne(User);

// Delete user by admin method
const deleteUser = factory.deleteOne(User);

// Update the logged-in user details
const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for update password', 400));
  }
  const filterBody = filterRequestBody(req.body, 'name', 'email');
  if (req.file) filterBody.photo = req.file.filename;

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

// Delete the logged-in user
const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

// Get me method
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
};
