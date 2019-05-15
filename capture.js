const AWS = require('aws-sdk'),
  ssm = new AWS.SSM(),
  qs = require('querystring'),
  processResponse = require('./src/process-response'),
  captureCharge = require('./src/capture-charge'),
  STRIPE_SECRET_KEY_NAME = `/${process.env.SSM_PARAMETER_PREFIX}/stripe-secret-key`,
  IS_CORS = true;

exports.handler = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return Promise.resolve(processResponse(IS_CORS));
  }
  if (!event.body) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid', 400));
  }
  const captureRequest = JSON.parse(event.body);
  if (!captureRequest.chargeId) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid arguments, please provide the chargeId (its ID) as mentioned in the app README', 400));
  }

  return ssm.getParameter({ Name: STRIPE_SECRET_KEY_NAME, WithDecryption: true }).promise()
    .then(response => {
      const stripeSecretKeyValue = response.Parameter.Value;
      return captureCharge(stripeSecretKeyValue, captureRequest.chargeId, captureRequest.email);
    })
    .then(capturedCharge => processResponse(IS_CORS, { capturedCharge }))
    .catch((err) => {
      console.log(err);
      return processResponse(IS_CORS, { err }, 500);
    });
};
