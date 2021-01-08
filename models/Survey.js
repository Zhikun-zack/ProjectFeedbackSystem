const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

//survey schema contains several recipient schema
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    //Detailed Survey options
    yes: {type: Number, default: 0},
    no:{type: Number, default: 0},
    //Relationship field between User Collection and Survey Collections
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model("survey", surveySchema);