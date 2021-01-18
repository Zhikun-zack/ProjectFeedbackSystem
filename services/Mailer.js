const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    //Doing some initialization work
    //surveyRoute.js calls "new Mailer(survey, surveyTemplate(survey))", the first param in constructor represent survey and the "content" represent template(HTML code)
    constructor({ subject, recipients }, content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        //attributes needed by sendgrid
        this.from_email = new helper.Email("xiaweiliang94@gmail.com");
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

    //In the surveyTemplate, create a mail template using HTML, and we need <a> tag to lead the user to some pages
    //If we set href as "localhost:", beacause of that all the devices localhost pages' URL are the same, if we dont add this function, the HTML will not know which devices' localhost page to lead the user who clik the <a> tag
    //So this function is used to track this page and tell sendgrid that we need to lead the user to this device's localhost page
    //With the help of this function, sendgrid will change localhost: to some unique URL, while it still lead to localhost
    //and also sendgrid knows who click the link
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

    async send() {
        const request = this.sgApi.emptyResquest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON
        });
        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;
