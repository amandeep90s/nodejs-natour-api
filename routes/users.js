const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');
const {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  protectedRoute,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
// Protect all routes after this middleware
router.use(protectedRoute);
router.patch('/update-password', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);
// Restricted all routes after this to admin only
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
