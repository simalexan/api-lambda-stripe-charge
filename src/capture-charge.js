'use strict';

const pubsubRepository = require('./pubsub-repository'),
  paymentProcessorRepository = require('./payment-processor'),
  TOPIC_ARN = process.env.TOPIC_ARN;

module.exports = async function captureCharge(secretKey, charge, email, paymentProcessor = paymentProcessorRepository, pubsub = pubsubRepository) {
  const capturedCharge = await paymentProcessor.captureCharge(secretKey, charge);
  capturedCharge.email = email;
  await pubsub.publish(capturedCharge, TOPIC_ARN);
  return capturedCharge;
};
