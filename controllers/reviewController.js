const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Get all reviews method
const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);
  res
    .status(200)
    .json({ status: 'success', results: reviews.length, data: { reviews } });
});
// Create new review method
const createReview = factory.createOne(Review);
// Delete review with review id method
const deleteReview = factory.deleteOne(Review);
// Update review with review id method
const updateReview = factory.updateOne(Review);
// Middleware: Set tour and user id before creating review
const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
};
