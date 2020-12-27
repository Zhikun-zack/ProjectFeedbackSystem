const passport = require('passport');

module.exports = app =>{
    //when users at this page, passport will start authentication process
    app.get('/auth/google', passport.authenticate('google',{
        scope: ['profile','email'],
    })
    );

    app.get('/auth/google/callback',passport.authenticate('google',{failWithError: true}));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    })
};
