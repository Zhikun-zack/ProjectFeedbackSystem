const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app =>{
    app.post('/api/stripe', async (req,res) => {
        if(!req.user){
            return res.status(401).send({ error: "You must log in!"});
        }

        //back-end operation for charge using stripe
        const charge = stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id,
        });
    
        //Get the user credit attribute and add 5
        req.user.credits += 5;
        const user = await req.user.save();
        //Send the user information back to the browser
        res.send(user);
    });


};