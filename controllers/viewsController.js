const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Overview page method
const getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});

// Tour details method
const getTour = catchAsync(async (req, res, next) => {
  const tourSlug = req.params.slug;
  const tour = await Tour.findOne({ slug: tourSlug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  res.status(200).render('tour', { title: tour.name, tour });
});

// Login page method
const getLoginForm = (req, res) => {
  res.status(200).render('login', { title: 'Log into your account' });
};

module.exports = { getOverview, getTour, getLoginForm };
