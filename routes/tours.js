const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protectedRoute, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviews');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    protectedRoute,
    restrictTo('admin', 'lead-guide', 'guide'),
    getMonthlyPlan
  );
router
  .route('/')
  .get(getAllTours)
  .post(protectedRoute, restrictTo('user', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protectedRoute, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protectedRoute, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
