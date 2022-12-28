import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MK1aISEZ3nHLJs1K6GfEoHBCXjat0XXsR03tQ1WNwE4KXIMU3op5dxseFfIY3dcoJ1n9y4JryxGDjzSA6GOKLDt00ZNV5RRR5'
);

export const bookTour = async (tourId) => {
  try {
    // Get the checkout session from API
    const session = await axios({
      method: 'GET',
      url: `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    // Create checkout form + charge the credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
