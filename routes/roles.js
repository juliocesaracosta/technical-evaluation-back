'use strict'

var express = require('express');
var RoleController = require('../controllers/rol');

var api = express.Router();
var md_auth = require('../middleware/authenticated');


//api.get('/roles', md_auth.ensureAuth, RolController.pruebas);
api.get('/roles', RoleController.getRoles);
api.post('/roles', RoleController.saveRole);
//api.update('/roles/:id', md_auth.ensureAuth, RoeController.updateRole);
api.put('/roles/:id', RoleController.updateRole);
//api.get('/roles/:id', md_auth.ensureAuth, RoleController.deleteRole);
api.delete('/roles/:id', RoleController.deleteRole);

module.exports = api;