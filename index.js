//Requires & Global Vars
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

//Set & Use Statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get('/', function(req,res) {
res.send('Hello Backend!');
});

app.post('/links', function(req,res){
//
});

app.get('/links/:id', function(req,res){
//
});

app.get('/:hash', function(req,res){
//
});



//Listener
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
