'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

const MONGO_URI = 'mongodb+srv://evaluation:feR6IM2LtAlPdV9B@cluster0.2xgtfpu.mongodb.net/evaluation?retryWrites=true&w=majority&appName=Cluster0'
// conexion database
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
})
.then(() => {
    console.log("conexion se realizo correctamente");
    
    //crear servidor
    app.listen(port,() => {
        console.log("servidor corriendo en http://localhost:3800"); 
    });
})
.catch((error) => {
    console.log("Error al conectarse: " + error.message);
});