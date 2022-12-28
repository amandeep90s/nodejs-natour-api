const express = require('express');
const { getCheckoutSession } = require('../controllers/bookingController');
const { protectedRoute } = require('../controllers/authController');

const router = express.Router();

router.get('/checkout-session/:tourId', protectedRoute, getCheckoutSession);

module.exports = router;
