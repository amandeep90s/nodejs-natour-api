const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tours');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/reviews');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Global Middleware

// Set security http headers
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

// Prevent paramter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'price',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'maxGroupSize',
    ],
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  // Create write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
}

// Limit requests from same IP address
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
app.get('/', (req, res) => {
  res.status(200).render('base', {
    title: 'Exciting tours for adventurous people',
    user: 'Jonas',
  });
});
app.get('/overview', (req, res) => {
  res.status(200).render('overview', { title: 'All Tours' });
});
app.get('/tour', (req, res) => {
  res.status(200).render('tour', { title: 'The Forst Hiker Tour' });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't handle ${req.originalUrl} in this server`, 404));
});

// Global Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
