
# API Gateway -> Lambda -> Stripe Charge Payment (Checkout)

## Description

This is a serverless component consisting of an API and Lambda functions that charge / capture / refund a Stripe account based on the API Gateway request data. Supports CORS. Written in Node.js.

## Requirements (Setup)

1. Create a Stripe account
2. Get your Stripe API Keys (both public and secret)
3. Store your Stripe Secret Key into AWS SSM as a SecureString by running the following, but be sure to replace the `lambda-stripe-charge/stripe-secret-key` with your preferred SSM Parameter Path (though it can be just `lambda-stripe-charge/stripe-secret-key`):

```ssh
aws ssm put-parameter --name /lambda-stripe-charge/stripe-secret-key --value YOUR_STRIPE_SECURE_KEY --type SecureString --overwrite
```

4. Want to use Stripe's Checkout ? - [https://stripe.com/docs/checkout](https://stripe.com/docs/checkout)
 (most likely others are supported too, but can't guarantee, need to check)
5. Set your frontend part as specified in the [https://stripe.com/docs/checkout#integration](https://stripe.com/docs/checkout#integration)
6. Extend your form with hidden input HTML elements for **amount** and **currency**. Those fields you will need to populate with the values chosen by the user. If not familiar with that approach I recommend this StackOverflow post - [https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook](https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook)

Will provide a video link on YouTube soon, as I will stream using this AWS App Repo template.

### Latest Release - 4.4.1

Changing to Node.js 10.x Runtime For Lambda

#### Previous Release 4.4.0

- Added Active X-Ray Tracing
