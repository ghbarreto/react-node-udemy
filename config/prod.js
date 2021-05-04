// production keys for herokuapp
module.exports = {
  // google auth
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // mongodb
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  // stripe website
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
