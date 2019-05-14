'use strict';

const pubsubRepository = require('./pubsub-repository'),
  paymentProcessorRepository = require('./payment-processor'),
  TOPIC_ARN = process.env.TOPIC_ARN,
  IS_CAPTURE = process.env.IS_CAPTURE;

module.exports = async function chargeCustomer(secretKey, token, email, amount, currency, description = 'Charge Description', paymentProcessor = paymentProcessorRepository, pubsub = pubsubRepository) {
  const createdCharge = await paymentProcessor.createCharge(secretKey, token, amount, currency, IS_CAPTURE, description);
  createdCharge.email = email;
  await pubsub.publish(createdCharge, TOPIC_ARN);
  return createdCharge;
}
