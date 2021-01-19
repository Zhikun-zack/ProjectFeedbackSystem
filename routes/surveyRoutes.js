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
    app.get("/api/surveys/thanks", (req,res) => {
        res.send("Thanks for voting!");
    });

    app.post("/api/surveys/webhooks", (req,res) => {
        const events = _.map(req.body, ({ email, url }) => {
            //.pathname is the path section of the URL, that comes after the host and before the query, including the initial slash if present
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            //console.log(p.test(pathname));
            //match will be an object if return some value and will be null if doesnt return any value
            const match = p.test(pathname);
            if( match ){
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        });

        console.log(events);
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