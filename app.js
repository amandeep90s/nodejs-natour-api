const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const AppError = require('./utils/appError');
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Global Middleware
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

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please again in an hour!',
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// Router mounting
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
//Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't handle ${req.originalUrl} in this server`, 404));
});
// Global Error handling middleware
app.use(globalErrorHandler);
module.exports = app;
