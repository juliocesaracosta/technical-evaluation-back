'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name : String,
    email: String,
    password : String,
    date: Date,
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default:'61cf779362fb5a7bb19e2b67'
    }
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});


module.exports = mongoose.model('User', UserSchema);