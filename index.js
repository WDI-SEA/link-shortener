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
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.set('view engine', 'ejs');

// routes

// get, form here
app.get('/', function(req, res) {
  res.render('index');
});

// get, show link
app.post('/links', function(req, res) {
	var data = req.body;
	console.log(req.body)
	res.send('ccccoool');
})
app.get('/links', function(req, res) {
	res.send('cool');
})
// post, accepts data from form, stores the URL in db and 
// redirects to the show route
app.post('/links', function(req, res) {
	
})



// get, redirect



// listen

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
