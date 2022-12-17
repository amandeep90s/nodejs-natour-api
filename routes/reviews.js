const express = require('express');
const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');
const { protectedRoute, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protectedRoute, restrictTo('user'), createReview);

module.exports = router;
