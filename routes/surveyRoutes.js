const mongoose = require("mongoose");
// make sure user is logged in
const requireLogin = require("../middlewares/requireLogin");
// make sure user has enough credits
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
// requiring the email template in the file.
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// requiring the survey model class
const Survey = mongoose.model("surveys");

module.exports = app => {
  // api to resolve users that vote in our survey
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thank you so much for voting!");
  });

  // make sure the user is logged in and has enough credits
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // creating a survey
    // in the req.body, extract all these properties below
    const { title, subject, body, recipients } = req.body;
    // creating an instance of the survey
    const survey = new Survey({
      title,
      // subject and the other properties translate to subject: subject
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // send an email with the survey and the email template
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      // send the survey to our database
      await survey.save();
      // deducts the user credits
      req.user.credits -= 1;
      const user = await req.user.save();

      // sending back the updated user model with the deducted credits
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
