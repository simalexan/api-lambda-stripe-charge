const AWS = require('aws-sdk'),
  ssm = new AWS.SSM(),
  processResponse = require('./src/process-response'),
  createRefund = require('./src/create-refund'),
  STRIPE_SECRET_KEY_NAME = `/${process.env.SSM_PARAMETER_PREFIX}/stripe-secret-key`,
  IS_CORS = true;

exports.handler = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return Promise.resolve(processResponse(IS_CORS));
  }
  if (!event.body) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid', 400));
  }
  const refundRequest = JSON.parse(event.body);
  if (!refundRequest.charge) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid arguments, please provide the charge (its ID) as mentioned in the app README', 400));
  }

  return ssm.getParameter({ Name: STRIPE_SECRET_KEY_NAME, WithDecryption: true }).promise()
    .then(response => {
      const stripeSecretKeyValue = response.Parameter.Value;
      return createRefund(stripeSecretKeyValue, refundRequest.charge, refundRequest.email);
    })
    .then(createdRefund => processResponse(IS_CORS, { createdRefund }))
    .catch((err) => {
      console.log(err);
      return processResponse(IS_CORS, { err }, 500);
    });
};