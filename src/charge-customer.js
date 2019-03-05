'use strict';

const pubsubRepository = require('./pubsub-repository'),
  paymentProcessorRepository = require('./payment-processor'),
  TOPIC_ARN = process.env.TOPIC_ARN;

module.exports = function chargeCustomer(secretKey, token, email, amount, currency, description = 'Charge Description', paymentProcessor = paymentProcessorRepository, pubsub = pubsubRepository) {
  let createdCharge;

  return paymentProcessor.createCharge(secretKey, token, amount, currency, description)
    .then(chargeResponse => {
      createdCharge = chargeResponse;
      createdCharge.email = email;
      return pubsub.publish(createdCharge, TOPIC_ARN);
    })
    .then(() => createdCharge)
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
