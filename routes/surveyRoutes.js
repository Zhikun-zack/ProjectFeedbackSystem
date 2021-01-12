const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit")
const Mailer = require('../services/Mailer');
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model('survey');

module.exports = app => {
    app.get("api/surveys/thanks", (req,res) => {
        res.send("Thanks for voting!");
    });
    
    app.post('/api/surveys', requireLogin, requireCredit, (req,res) => {
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
        const mailer = new Mailer(survey, surveyTemplate);
        try{
            await mailer.send();
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