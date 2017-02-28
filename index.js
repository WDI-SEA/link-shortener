// global variables and requires
var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// var hashids = new Hashids('Shorten Link', 5);
// console.log(hashids.encode(1)); // 6ZwX8



// use and set statements
app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.set('view engine', 'ejs');

// routes

// get, root view
app.get('/', function(req, res) {
  res.send('Hello Backend!');
});

// post, site w/ form to create link


// get, show link


// get, redirect



// listen

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
