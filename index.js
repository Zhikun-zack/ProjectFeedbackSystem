//Framework of creating APP
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
const bodyParser = require('body-parser');
//First invoke the mongoDB collection then the passport file can use them
require('./models/User');
require("./models/Survey");
//invoke passport
require('./services/passport');

//Using mongoose to connect to mongodb that hosted in mongodb atlas and I created
mongoose.connect(keys.mongoURI,() => { }, { useNewUrlParser: true }).then(() => console.log("success")).catch((err)=>{console.log("Faillllllll",err)});

//Init the express
const app = express();

//A middleware, parse the incomming json information and store it in req.body
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
//Initialize the passport
app.use(passport.initialize());
//Using the session cookie
app.use(passport.session());

//All of the route handler
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

//Dynamic Port binding, related with port imported in cmd command 
const PORT = process.env.PORT || 5000;

//Define the localhost port
app.listen(PORT);

