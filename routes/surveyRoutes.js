const _ = require ('lodash');
const {Path} = require('path-parser');
const { URL } = require('url');
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit")
const Mailer = require('../services/Mailer');
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model('survey');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        //Get all the survey certain user send
        const surveys = await Survey.find({ _user: req.user.id})
            .select({ recipients: false });

        res.send(surveys);
    })
    app.get("/api/surveys/:surveyId/:choice", (req,res) => {
        res.send("Thanks for voting!");
    });

    app.post("/api/surveys/webhooks", (req,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
         .map(({ email, url }) => {
            //.pathname is the path section of the URL, that comes after the host and before the query, including the initial slash if present
            //console.log(p.test(pathname));
            //match will be an object if return some value and will be null if doesnt return any value
            const match = p.test(new URL(url).pathname);
            if( match ){
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        //console.log(events);
        //Remove the "undefinded" event
        .compact()
        //Remove the duplicated event, to avoid that the user click the same <a> tag several time
        .uniqBy("email","surveyId")
        .each(({surveyId,email,choice}) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    } 
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date(),
                }
            ).exec();
        })
        .value();

        //Send the data back to webhook,webhook will know the post process has success, otherwise the webhook will repeat execute the code above and we will get results repeatedly
        res.send({});
    })

    app.post('/api/surveys', requireLogin, requireCredit, async (req,res) => {
        const { title, subject, body, recipients } = req.body;
        //Create a instance in Survey collection
        const survey = new Survey({
            title,
            subject,
            body,
            //take the email address, split using "," and the using map to change each splited string to object{} 
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        //Place to send an email
        //It contains two input params, survey is the content, object type,  and the surveyTemplate is the HTML template which contains the information in the survey
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            //save the survey to the database
            await survey.save();
            //Update the credits
            req.user.credits -= 1;
            const user = await req.user.save();
            //Send the changed user credits back and change the database and the header 
            res.send(user);
        } catch (err){
            res.status(422).send(err);
        }
    });
};