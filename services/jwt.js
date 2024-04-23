'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'evaluation';

function createToken (user) {
    var paylaod = {
        sub: user._id,
        name: user.name,
        email: user.email,
        pass: user.password,
        iat : moment().unix(),
        exp: moment().add(600, 'seconds').unix()
    };
    return jwt.encode(paylaod, secret);
};

function decodeToken (token) {
    return jwt.decode(token, secret,true, {"alg": "HS256","typ": "JWT"});
};

module.exports = {
    createToken,
    decodeToken
}
