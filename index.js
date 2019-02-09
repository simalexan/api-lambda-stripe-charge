const AWS = require('aws-sdk'),
  ssm = new AWS.SSM(),
  qs = require('querystring'),
  processResponse = require('./process-response'),
  STRIPE_SECRET_KEY_NAME = `${process.env.SSM_PARAMETER_PREFIX}/stripe-secret-key`,
  IS_CORS = true;

exports.handler = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return Promise.resolve(processResponse(IS_CORS));
  }
  if (!event.body) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid', 400));
  }
  const newCharge = qs.parse(event.body);
  if (!newCharge.amount || !newCharge.currency) {
    return Promise.resolve(processResponse(IS_CORS, 'invalid arguments, please provide amount and currency fields as mentioned in the app README', 400));
  }

  return ssm.getParameter({ Name: STRIPE_SECRET_KEY_NAME, WithDecryption: true }).promise()
    .then(response => {
      const stripeSecretKeyValue = response.Parameter.Value;
      const stripe = require('stripe')(stripeSecretKeyValue);

      return stripe.charges.create({
        source: newCharge.stripeToken,
        amount: newCharge.amount,
        currency: newCharge.currency,
        description: 'Charge Description'
      });
    })
    .then(charge => processResponse(IS_CORS, { createdCharge: charge }))
    .catch((err) => {
      console.log(err);
      return processResponse(IS_CORS, { err }, 500);
    });
};
