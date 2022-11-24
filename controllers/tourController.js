const Tour = require('../models/tourModel');

const getAllTours = (req, res) => {
  res.status(200).json({
    message: 'success',
    // results: tours.length,
    // data: { tours: tours },
  });
};

const getTour = (req, res) => {
  // const tour = tours.find((item) => item.id === parseInt(req.params.id, 10));
  // res.status(200).json({
  //   message: 'success',
  //   data: { tour: tour },
  // });
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

const updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: 'Tour updated successfully' } });
};

const deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
