import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { finalAmount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret, message : "redirecting to stripe.com" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createPaymentIntent;
