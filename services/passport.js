const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const HttpsProxyAgent = require('https-proxy-agent');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

//In production envi we cannot use proxy otherwise we will meet internal server error
if(process.env.NODE_ENV === "production"){
    passport.use(
        new GoogleStrategy(
          {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
          },
          async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
      
            if (existingUser) {
              return done(null, existingUser);
            }
      
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
          }
        )
      );
}
//In dev envioronment we have to use the http proxy to help data send through the firewall
else {
    //Create a strategy which will be used by passport
    const gStartegy = new GoogleStrategy({
        clientID : keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        },
        //error function
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
    
            if (existingUser) {
            return done(null, existingUser);
            }
    
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        });
    //set agent if behind firewall
    const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || "http://localhost:1080");
    gStartegy._oauth2.setAgent(agent);

    //passport end strategyasd
    passport.use(gStartegy);
}
