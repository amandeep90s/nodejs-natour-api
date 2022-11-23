const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();

// Middelwares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  // Create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );

  app.use(morgan('combined', { stream: accessLogStream }));
}
app.use(express.static(`${__dirname}/public`));
// Router mounting
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
