const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
} = require('../controllers/viewsController');
const { isLoggedIn, protectedRoute } = require('../controllers/authController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/my-account', protectedRoute, getAccount);
router.post('/submitted-user-data', protectedRoute, updateUserData);

module.exports = router;
