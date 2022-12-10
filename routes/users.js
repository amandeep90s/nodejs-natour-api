const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
} = require('../controllers/userController');
const {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  protectedRoute,
  updatePassword,
} = require('../controllers/authController');

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/update-password', protectedRoute, updatePassword);
router.patch('/update-me', protectedRoute, updateMe);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
