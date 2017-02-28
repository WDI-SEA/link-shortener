// global variables and requires
var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

// var hashids = new Hashids('Shorten Link', 5);
// console.log(hashids.encode(1)); // 6ZwX8



// use and set statements
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.set('view engine', 'ejs');

// routes

// get, form here
app.get('/', function(req, res) {
  res.render('index');
});

// post, receive link 
app.post('/links', function(req, res) {
	db.link.create({
		url: req.body.link
	}).then(function(link) {
		console.log(link.id);
			res.send('success');
	})

	// .then(function() {
	// 	res.redirect('/result/:');		
	// })
})

app.get('/links', function(req, res) {
	res.sendStatus(404);
})

	



// get, redirect



// listen

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
