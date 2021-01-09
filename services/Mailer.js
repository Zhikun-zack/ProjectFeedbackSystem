const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content){
        super();
        //attributes needed by sendgrid
        this.from_email = new helper.Email("Place to put sender email");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        //formatAddresses function
        this.recipients = this.formatAddresses(recipients);
        //build-in function, add the body information into the mailer
        this.addContent(this.body);

        this.addClickTracking();
        //take the information in recipients before and add them into mailer
        this.addRecipients();
    }
    //recipients is the array of emails
    //extract each emails from recipients
    formatAddresses (recipients){
        return recipients.map(
            //arrow function input a object contains email then return a standard format email
            ({email}) => {
                return new helper.Email(email);
            }
        )
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    //
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient =>{
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
}

module.exports = Mailer;
