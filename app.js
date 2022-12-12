const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const path = require('path');
const AppError = require('./utils/appError');
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Global Middleware

// 1. Set security http headers
app.use(helmet());
// 2. Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xssClean());
// 3. Development logging
if (process.env.NODE_ENV === 'development') {
  // Create write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
}
// 4. Serving static files
app.use(express.static(`${__dirname}/public`));
// 5. Limit requests from same IP address
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
