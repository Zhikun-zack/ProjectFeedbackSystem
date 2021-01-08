const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit")

const Survey = mongoose.model('surveys');

module.exports = app => {
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

        })
    });
};