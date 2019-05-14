'use strict';

module.exports = {
  createCharge: async function (stripeSecretKey, token, amount, currency, isCapture, description = 'Charge Description'){
    const stripe = require('stripe')(stripeSecretKey);

    return await stripe.charges.create({
      source: token,
      amount: amount,
      currency: currency,
      description: description,
      capture: isCapture == 'true'
    });
  },
  captureCharge: async function (stripeSecretKey, charge){
    const stripe = require('stripe')(stripeSecretKey);
    return await stripe.charges.capture({ charge });
  }
};
