const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    message: 'success',
    results: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((item) => item.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.status(200).json({
    message: 'success',
    data: { tour: tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: 'Tour updated successfully' } });
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  res.status(204).json({ status: 'success', data: null });
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
