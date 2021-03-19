//Contain all the route handlers that needs in the process of google auth
const passport = require('passport');

module.exports = app =>{
    //when users at this page, passport will start authentication process
    app.get(
        '/auth/google', 
        //'google' represent Google OAuth Strategy
        passport.authenticate('google',{
        //What data attribute that we want to access
        scope: ['profile','email'],
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res) => {
            //Get the callback results and change the route to new route
            //When clicked log in with google and authorized the browser, change the page to the Dashboard page(/survey)
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        //When go to the /logout page and log out, user will kick back to the landing page 
        res.redirect('/');
    })

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    })
};
