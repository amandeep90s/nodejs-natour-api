const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
      maxlength: [40, 'Your name must not be more than 40 characters'],
      minlength: [3, 'Your name must not be less than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please tell us your email'],
      unique: true,
      lowercase: true,
      maxlength: [40, 'Your email must not be more than 40 characters'],
      minlength: [8, 'Your email must not be less than 8 characters'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Your password must not b less than 8 characters'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
