const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// Get all reviews method
const getAllReviews = factory.getAll(Review);
// Get review detail method
const getReview = factory.getOne(Review);
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
  getReview,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
};
