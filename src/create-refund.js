'use strict';

const pubsubRepository = require('./pubsub-repository'),
  paymentProcessorRepository = require('./payment-processor'),
  TOPIC_ARN = process.env.TOPIC_ARN;

module.exports = async function createRefund(secretKey, charge, email, paymentProcessor = paymentProcessorRepository, pubsub = pubsubRepository) {
  const createdRefund = await paymentProcessor.createRefund(secretKey, charge);
  createdRefund.email = email;
  await pubsub.publish(createdRefund, TOPIC_ARN);
  return createdRefund;
};
