'use strict';

const { captureAsyncFunc } = require('./tracing-repository'),
  CREATE_CHARGE_MESSAGE_TRACE = 'Create Charge',
  CAPTURE_CHARGE_MESSAGE_TRACE = 'Capture Charge',
  CREATE_REFUND_MESSAGE_TRACE = 'Create Refund';

module.exports = {
  createCharge: async function (stripeSecretKey, token, amount, currency, isCapture, description = 'Charge Description') {
    const stripe = require('stripe')(stripeSecretKey, {
      'apiVersion': (process.env.API_VERSION == "null") ? null : process.env.API_VERSION,
      'maxNetworkRetries': process.env.MAX_NETWORK_RETRIES,
      'httpAgent': null,
      'timeout': process.env.TIMEOUT,
      'host': process.env.HOST,
      'port': process.env.PORT,
      'telemetry': process.env.TELEMETRY
    });
    return await captureAsyncFunc(CREATE_CHARGE_MESSAGE_TRACE, () =>
      stripe.charges.create({
        source: token,
        amount: amount,
        currency: currency,
        description: description,
        capture: isCapture == 'true'
      })
    );
  },
  captureCharge: async function (stripeSecretKey, charge) {
    const stripe = require('stripe')(stripeSecretKey, {
      'apiVersion': (process.env.API_VERSION == "null") ? null : process.env.API_VERSION,
      'maxNetworkRetries': process.env.MAX_NETWORK_RETRIES,
      'httpAgent': null,
      'timeout': process.env.TIMEOUT,
      'host': process.env.HOST,
      'port': process.env.PORT,
      'telemetry': process.env.TELEMETRY
    });
    return await captureAsyncFunc(CAPTURE_CHARGE_MESSAGE_TRACE, () => stripe.charges.capture(charge));
  },
  createRefund: async function (stripeSecretKey, charge) {
    const stripe = require('stripe')(stripeSecretKey, {
      'apiVersion': (process.env.API_VERSION == "null") ? null : process.env.API_VERSION,
      'maxNetworkRetries': process.env.MAX_NETWORK_RETRIES,
      'httpAgent': null,
      'timeout': process.env.TIMEOUT,
      'host': process.env.HOST,
      'port': process.env.PORT,
      'telemetry': process.env.TELEMETRY
    });
    return await captureAsyncFunc(CREATE_REFUND_MESSAGE_TRACE, () => stripe.refunds.create({ charge }));
  }
};
