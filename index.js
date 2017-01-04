// REQUIREMENTS
var express = require('express');
var fs = require('fs');
var db = require('./models'); 
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require('hashids');
var hashids = new Hashids("real G's move in silence like lasanga");

// SET/USE STATEMENTS
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('files'))


// ROUTES

// GET - Contains a simple form where a user can enter a URL and get a short URL
app.get('/', function(req, res) {
	res.render('index');
});

// POST - Accepts data from the form. Stores the URL in the database and redirects to the show route.
app.post('/links', function(req,res) {
	db.link.create(req.body).then(function(link) {
	  res.redirect('/links/' + link.id);
	});
});

// GET - Displays the short URL of the specified id (so the user can copy / share it)
app.get('/links/:id', function(req,res) {
	db.link.findById(req.params.id).then(function(link) {
	  var hash = hashids.encode(link.id);
	  var host = req.get('host');
	  var hashedURL = host + '/' + hash;
	  res.render('show', {hash: hashedURL});
	});
});

// GET - Takes the hash and redirects the user to the URL stored in the database.
app.get('/:hash', function(req,res) {
	var linkId = hashids.decode(req.params.hash);
	db.link.findById(linkId[0]).then(function(link) {
	  res.redirect(link.url);
	});
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
