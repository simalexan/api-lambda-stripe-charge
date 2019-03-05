'use strict';

module.exports = {
  createCharge: function (stripeSecretKey, token, amount, currency, description = 'Charge Description'){
    const stripe = require('stripe')(stripeSecretKey);

    return stripe.charges.create({
      source: token,
      amount: amount,
      currency: currency,
      description: description
    });
  }
};
