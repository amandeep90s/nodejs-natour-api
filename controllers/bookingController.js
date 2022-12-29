const Stripe = require('stripe');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const handleFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    return next(new AppError('Tour is not found with that ID', 404));
  }
  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              'https://thumbs.dreamstime.com/b/forest-hike-trail-hiker-woman-walking-autumn-fall-nature-background-season-hiking-active-people-lifestyle-wearing-backpack-193896791.jpg',
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // Create session as response
  res.status(200).json({ status: 'success', session });
});

const createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) {
    return next();
  }
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});

const createBooking = handleFactory.createOne(Booking);
const getBooking = handleFactory.getOne(Booking);
const getAllBookings = handleFactory.getAll(Booking);
const updateBooking = handleFactory.updateOne(Booking);
const deleteBooking = handleFactory.deleteOne(Booking);

module.exports = {
  createBookingCheckout,
  getCheckoutSession,
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
