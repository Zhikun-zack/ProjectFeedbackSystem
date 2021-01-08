const mongoose = require("mongoose");
const { Schema } = mongoose;

//This schema contain the information of whether the user has provided surveys
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
