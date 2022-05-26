const router = require("express").Router();
require('dotenv/config')
const stripe = require("stripe")(process.env.STRIPE_SECRET)

router.post("/create-checkout-session", async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "EUR",
          product_data: {
            name: "Test Product",
          },
          unit_amount: (req.body.cartTotal * 100).toFixed(0),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${process.env.ORIGIN}/checkout/${req.body.id}?success=true`,
    // cancel_url: `${process.env.ORIGIN}/checkout/${req.body.id}?canceled=true`,
    success_url: `${process.env.ORIGIN}/${req.body.id}?success=true`,
    cancel_url: `${process.env.ORIGIN}/${req.body.id}?canceled=true`,
  });

  res.json({"url":session.url});
});

module.exports = router;
