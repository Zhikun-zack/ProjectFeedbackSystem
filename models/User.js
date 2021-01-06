const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId : String,
    //attribute for number of credits
    credits: { type:Number, default: 0},
});

mongoose.model("users", userSchema);