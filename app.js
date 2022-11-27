const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  // Create write stream (in append mode)
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
//Handling unhandled routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't handle ${req.originalUrl} in this server`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});
// Error handling middleware
app.use((err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
