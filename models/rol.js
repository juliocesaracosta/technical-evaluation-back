'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = new Schema({
    id: {type: Number, default: 0},
    description : {type: String, required: [true, 'La descripción es requerida.']}
});

module.exports = mongoose.model('Role', RolSchema);