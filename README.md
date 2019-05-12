
## API Gateway -> Lambda -> Stripe Charge Payment (Checkout)

## Description

This is a Lambda function that charges a Stripe account based on the API Gateway request data. Supports CORS. Written in Node.js. It's a Nuts & Bolts application component for AWS Serverless Application Repository.

## Requirements (Setup)

1. Create a Stripe account
2. Get your Stripe API Keys (both public and secret)
3. Store your Stripe Secret Key into AWS SSM as a SecureString by running the following, but be sure to replace the `lambda-stripe-charge` with your preferred SSM prefix (though it can be just `lambda-stripe-charge`):

```ssh
aws ssm put-parameter --name /lambda-stripe-charge/stripe-secret-key --value YOUR_STRIPE_SECURE_KEY --type SecureString --overwrite
```

4. Want to use Stripe's Checkout ? - [https://stripe.com/docs/checkout](https://stripe.com/docs/checkout)
 (most likely others are supported too, but can't guarantee, need to check)
5. Set your frontend part as specified in the [https://stripe.com/docs/checkout#integration](https://stripe.com/docs/checkout#integration)
6. Extend your form with hidden input HTML elements for **amount** and **currency**. Those fields you will need to populate with the values chosen by the user. If not familiar with that approach I recommend this StackOverflow post - [https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook](https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook)

Will provide a video link on YouTube soon, as I will stream using this AWS App Repo template.

### Latest Release - 3.1.0

Added a few fixes regarding datatable naming:

- Changed to use the SAM Policy Template for SSM Parameter Store - `SSMParameterReadPolicy`
