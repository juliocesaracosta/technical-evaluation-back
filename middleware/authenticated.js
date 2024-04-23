'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'evaluation';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación', cabeceras: req.headers});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {

        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            
            return res.status(401).send({
                
                message:'token a expirado.'
            
            });

        }

    } catch(ex) {

        return res.status(401).send({
            
            message:'token no valido.'

        });

    }

    req.user = payload;
    next();
    
}