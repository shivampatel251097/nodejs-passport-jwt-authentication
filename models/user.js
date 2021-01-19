const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Passport local mongoose- this bydefault create schema with USER(having fields username, password)
var passportLocalMongoose = require('passport-local-mongoose');
//User schema to store in mongoDB
var User =  new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password:{
    //     type: String,
    //     required: true
    // },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);