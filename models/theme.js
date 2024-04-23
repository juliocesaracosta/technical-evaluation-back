'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemeSchema = new Schema({
    description : {type: String, required: [true, 'La descripción de la tematica es requerida.']}
});

module.exports = mongoose.model('Theme', ThemeSchema);