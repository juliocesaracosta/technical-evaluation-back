'use strict'
var bcrypt = require('bcrypt');
var User = require('../models/user');
var jwt = require('../services/jwt');
var moment = require('moment');
var mongoose = require('mongoose');
const saltRounds = 10;

function saveUser(req, res){
    var params = req.body;
    var user = new User();
    if(params.name){
        user.name = params.name;
        user.email = params.email;
        user.rol = mongoose.Types.ObjectId(params.rol);
        // controlar usuarios duplicados
        User.find({ $or: [
            {email: user.email.toLowerCase()},
            {name: user.name.toLowerCase()}
        ]}).exec((err, users) => {
            
            if(err) return res.status(500).send({message:'Error en la petición.'});

            if(users && users.length >= 1){
                return res.status(500).send({message: 'Usuario ya se encuentra registrado.'});
            } else {
                bcrypt.hash(params.password, saltRounds, (err, hash) => {
                    user.password = hash;
                    user.validation = 0;
                    user.date = moment().toDate();
                    user.token = jwt.createToken(user);

                    user.save((err, userStored) => {
                        console.log(err);
                        if(err) return res.status(500).send({message:'Error al guardar el usuario.' + err});
                        
                        if(userStored){
                            res.status(200).send({user: userStored});
                        }else {
                            res.status(400).send({message:'No se ha registrado el usuario.'})
                        }
                    });
                });  
            }
        });

    } else {
        res.status(200).send({
            message:'envia todo los campos necesarios!'
        });
    }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;
    if (params.validation){
        var userValidation = jwt.decodeToken(params.validation);
        email = userValidation.email;
        password = userValidation.pass;

        User.findOneAndUpdate(
            //filtros
            {email:email,password:password},
            { $set: {
                    validation:1
                }
            },
            {
                returnOriginal: false
            }
        , function( error, result){

        });
    }
    
    if (email && password) {
        User.findOne({email : email})
        .populate({path:'rol'})
        .exec((err, user) => {
            var errorPass = false;
            if(err) return res.status(500).send({message:'Error en la peticion'});
            if(user){
                
                if (params.validation) {
                    if (user.password !== password.toString()) {
                        errorPass = !errorPass;
                    }
                } else {
                    bcrypt.compare(password.toString(), user.password, (err, check) => {
                        if(!check){
                            errorPass = !errorPass;  
                        }

                        if (errorPass) {
                            return res.status(400).send({message:'El password es incorrecto. Revise el password capturado.'})
                        }
            
                        var token = jwt.createToken(user);
                        return res.status(200).send({user: user, token: token});
                    });
                }
            } else {
                return res.status(400).send({message:'El usuario no existe. Revise el usuario capturado!!.'}) 
            }
        })
    } else {
        res.status(200).send({
            message:'envia todo los campos necesarios!'
        });  
    }
}

function getUser(req, res){
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message:'Error en la peticion.'});

        if(!user) return res.status(404).send({message:'El usuario no existe.'});

        return res.status(200).send({user});
    })

}

//Devolver un listado de usuario paginados
function getUsers(req, res){
    //var identity_user_id = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
        page = page == 0 ? 1 : page;
    }

    var itemsPerPage = 5;
    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        
        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(!users) return res.status(400).send({message:'No hay usuarios'});

        return res.status(200).send({
            users : users,
            total: total,
            pages : Math.ceil(total/itemsPerPage)
        });
    });
}

module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers

};