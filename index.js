//Framework of creating APP
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//A middleware, parse the incomming json information and store it in req.body
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Dynamic Port binding, related with port imported in cmd command 
const PORT = process.env.PORT || 5000;

//Define the localhost port used to show this web page locally
app.listen(PORT);

///add some new lines to this app ahashuua a

