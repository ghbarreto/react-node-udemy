const keys = require("../config/keys");
// requiring stripe and utilizing the key
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // handling the payment through the stripe api
  // use the stripe library from npm
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // creates a charge to the credit card with the token
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    // adding credits
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
