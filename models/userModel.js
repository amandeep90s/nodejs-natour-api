const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
      validate: {
        //  This only works on create and save methods
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
  },
  { timestamps: true }
);

// Encrypt user password
userSchema.pre('save', async function (next) {
  //  Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('User', userSchema);
