const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// requiring the models
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// initializing the auth routes
require("./routes/authRoutes")(app);
// initializing the billing routes
require("./routes/billingRoutes")(app);
// initializing the survey routes;
require("./routes/surveyRoutes")(app);

// this will only run when the app is in production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like main.js file, or main.css file.

  // if any get request comes in for any routes and
  //the app cannot find it, then look into the client
  //and check if the route will be in there
  app.use(express.static("client/build"));

  // Express will render the index.html file if it
  // doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
