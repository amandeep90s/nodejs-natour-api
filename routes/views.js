const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controllers/viewsController');
const { isLoggedIn, protectedRoute } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/my-account', protectedRoute, getAccount);
router.get('/my-tours', protectedRoute, getMyTours);
router.post('/submitted-user-data', protectedRoute, updateUserData);

module.exports = router;
