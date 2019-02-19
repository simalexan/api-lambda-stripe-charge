'use strict';

module.exports = {
  createCharge: function (token, amount, currency, description = 'Charge Description'){
    const stripe = require('stripe')(token);

    return stripe.charges.create({
      source: token,
      amount: amount,
      currency: currency,
      description: description
    });
  }
};
