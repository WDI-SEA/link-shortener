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
//Contains a simple form where a user can enter a URL and get a short URL
});

app.post('/links', function(req,res){
//Accepts data from the form. Stores the URL in the database and redirects to the show route.
});

app.get('/links/:id', function(req,res){
//Displays the short URL of the specified id (so the user can copy / share it)
});

app.get('/:hash', function(req,res){
//Takes the hash and redirects the user to the URL stored in the database.
});



//Listener
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
