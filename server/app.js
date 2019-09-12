var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var characters = require('./routes/characters');
var team = require('./routes/team');

var app = express();
var characterService = require('./services/character.service');
//characterService.mock();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/character', characters);
app.use('/api/team', team);

module.exports = app;
