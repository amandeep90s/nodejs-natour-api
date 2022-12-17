const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protectedRoute, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protectedRoute, restrictTo('user'), createReview);

router.route('/:id').delete(deleteReview);

module.exports = router;
