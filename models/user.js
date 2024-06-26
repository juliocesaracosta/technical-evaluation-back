'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UserSchema = Schema({
    name : {type: String, required: [true, 'El nombre de usuario es requerido.']},
    email: {
        type: String,
        required: [true, 'El correo del usuario es requerido.'],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Correo no valido."
        }
    },
    password : {
        type: String,
        required: [true, 'El password es requerido.'],
        // validate: {
        //     validator: function(v) {
        //         return v.length >= 4 && v.length <= 8;
        //     },
        //     message: 'El password debe estar mínimo 4 y máximo 8.'
        // }
    },
    date: Date,
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default:'6627f774efd229014da844dc',
        required: [true, 'El rol para el usuario es requerido.']
    }
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});



module.exports = mongoose.model('User', UserSchema);