const AWS = require('aws-sdk'),
    stripe = require('stripe'),
    qs = require('querystring'),
    processResponse = require('./process-response'),
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
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

	return stripe.charges.create({
		source: newCharge.stripeToken,
		amount: newCharge.amount,
		currency: newCharge.currency,
		description: 'Charge Description'
    })
    .then(charge => processResponse(IS_CORS, {charge}))
    .catch((err) => {
        console.log(err);
        return processResponse(IS_CORS, 'stripe-error', 500);
	});
};
