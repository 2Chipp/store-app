
const STRIPE_KEY = "sk_test_51OHv3wDn85kwErxxoh2V9L0CLoLY7WyLgDV0ZRrkX6L4mfxWNMDCu5RyL2MP6ppkTrFH1cZ1CmoQmrHd8whArnXm00KzrHLRa0"
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(STRIPE_KEY);

export const payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
}


