'use strict'

var express = require('express');
var bodyParse = require('body-parser');
var cors = require('cors');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var roles_routes = require('./routes/roles');
var themes_routes = require('./routes/themes');

//middlewares
app.use(bodyParse.urlencoded({
    limit: 50000,
    extended:false
}));
app.use(bodyParse.json({limit: "50mb"}));
app.use(cors());
app.use('/uploads', express.static('uploads'));
//core

// rutas
app.use('/api', user_routes);
app.use('/api', roles_routes);
app.use('/api', themes_routes);

//exportar
module.exports = app;
