const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
// make sure user is logged in
const requireLogin = require("../middlewares/requireLogin");
// make sure user has enough credits
const requireCredits = require("../middlewares/requireCredits");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// requiring the survey model class
const Survey = mongoose.model("surveys");
// requiring the email template in the file.
const Mailer = require("../services/Mailer");

module.exports = app => {
  // api to resolve users that vote in our survey
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thank you so much for voting!");
  });

  // getting the surveys created from an user
  app.get("/api/surveys/", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  // logic to receive values from sendgrid
  app.post("/api/surveys/webhooks", (req, res) => {
    // Path retrieves the data from the URL when using /:
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
          }
        ).exec();
      })
      .value();
    res.send({});
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
