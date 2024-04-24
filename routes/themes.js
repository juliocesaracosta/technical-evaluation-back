'use strict'

var express = require('express');
var ThemeController = require('../controllers/theme');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

api.post('/themes', md_auth.ensureAuth, ThemeController.saveTheme);
api.put('/themes/:id', md_auth.ensureAuth, ThemeController.updateTheme);
//api.delete('/themes/:id', md_auth.ensureAuth, ThemeController.deleteTheme);
api.get('/themes', ThemeController.getThemes);

module.exports = api;