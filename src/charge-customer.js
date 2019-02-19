'use strict';

const pubsubRepository = require('./pubsub-repository'),
  paymentProcessorRepository = require('./payment-processor');

module.exports = function chargeCustomer(token, amount, currency, description = 'Charge Description', paymentProcessor = paymentProcessorRepository, pubsub = pubsubRepository) {
  let createdCharge;

  return paymentProcessor.createCharge(token, amount, currency, description)
    .then(chargeResponse => {
      createdCharge = chargeResponse;
      return pubsub.publish(createdCharge, TOPIC_ARN);
    })
    .then(() => createdCharge)
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
