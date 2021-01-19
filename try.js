function printValue (value){
    console.log(value);
}

const myPromise = new Promise(function(myResolve, myReject){
    let x = 1;
    if( x === 0){
        myResolve('OK');
    }else {
        myReject('error')
    }
});

myPromise.then(
    function(value){printValue(value)},
    function(error){printValue(value)}
)


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