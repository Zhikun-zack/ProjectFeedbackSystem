const mongoose = require('mongoose');
const { Schema } = mongoose;

//User contains surveys
const userSchema = new Schema({
    googleId : String,
    //attribute for number of credits
    credits: { type:Number, default: 0},
});
//tell mongoDB that we will create a collection called users 
mongoose.model("users", userSchema);