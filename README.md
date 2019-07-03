
# API Gateway -> Lambda -> Stripe Charge Payment (Checkout)

## Description

This is a Lambda function that charges a Stripe account based on the API Gateway request data. Supports CORS. Written in Node.js. It's a Nuts & Bolts application component for AWS Serverless Application Repository.

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

### Latest Release - 4.1.0

A new release with a new feature to also do charge and capture of payments:

- An important change for the SSM Parameter Prefix, it has been changed to SSM Parameter Path (a full path, without the forward slash). This completely removes the dependency to the `stripe-secret-key` value. Meaning that you can now do `my-stage/some-path/another-path` or whatever you like.

#### Previous Release 4.0.0

A new release with a new feature to also do charge and capture of payments:

- An additional parameter `EnableCapture` which you can set to `true` and on the `/charge` endpoint do only an authorization of a charge (to reserve funds). By default its `false`
- An additional API endpoint `/capture` which you can call only upon an authorized charge (where you haven't immediatelly charged the customer), to actually pick up the reserved funds from the customer. It requires three parameters (`charge` - the id of the charge you want to capture and `email` - the email of the customer, useful for the SNS Topic)
- An additional API endpoint `/refund` which you can call only upon an authorized charge, to actually refund up the reserved / paid funds from the customer. It requires three parameters (`charge` - the id of the charge you want to refund and `email` - the email of the customer, useful for the SNS Topic)
