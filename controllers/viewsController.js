const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = (req, res) => {
  res.status(200).render('tour', { title: 'The Forst Hiker Tour' });
};

module.exports = { getOverview, getTour };
