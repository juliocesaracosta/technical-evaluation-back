'use strict'
var bcrypt = require('bcrypt');
var Role = require('../models/rol');

var jwt = require('../services/jwt');
var moment = require('moment');


function getRoles(req, res) {
    Role.find({}).exec((error, roles) => {
        return res.status(200).send({roles: roles, message: '', error: 0});
    });
}

function saveRole(req, res) {
    var role = new Role();

    role.description = req.body.description;

    Role.countDocuments({},(error, count) =>{
        count++;
        role.id = count;
        role.save((error, roleStore) => {
            if (error) {
                res.status(500).send({
                    message: 'Error al guardar el rol. ' + error.toJSON().message || ''
                });
            } else {
                res.status(200).send({
                    message: 'Se gurdo correctamente el rol.',
                    rol: roleStore
                }); 
            }
        });
    });
}

function updateRole(req, res) {

}

function deleteRole(req, res) {

}

function sendEmail (req , res){
    var params = req.body;

    let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: "jcesartrabajo@gmail.com",
                pass: "jbrmtoivfoqsfmpk"
            }
    })

    var message = {
        from: "jcesartrabajo@gmail.com",
        to: "cesar01_99@hotmail.com",
        subject: "Prueba",
        text: "Hello SMTP Email"
    }
    transporter.sendMail(message, (err, info) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: info
            });
        }
    })
    
};


module.exports = {
    getRoles,
    saveRole,
    updateRole,
    deleteRole
};