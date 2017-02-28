// global variables and requires
var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models');

var hashids = new Hashids('Shorten Link', 5);




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
app.post('/links', function(req, res) { // it's a post request
	db.link.create({
		url: req.body.link
	}).then(function(link) {
		res.send({redirectUrl: '/links/' + link.id});
	});
});

app.get('/links/:id', function(req, res) {
	// console.log(hashids.encode()); // 6ZwX8
	var id = req.params.id;

	db.link.find({
		where: {id: id}
	})
	.then(function(link) {
		var url = link.url;
		var hashedId = hashids.encode(link.id);
		console.log('encoded' + hashedId);
		console.log('decoded' + hashids.decode(hashedId));
		//hashedUrl = hashedUrl.encode()
		var urlObj = {
			hash: hashedId,
			url: url
		};
		res.render('result', {urlObj: urlObj});
	})
})

app.get('/:hash', function(req, res) {
	// receive hash parameter
	var linkObj = req.params;
	// unscramble hash -> corresponding table id
	var decodedId = hashids.decode(linkObj.hash);
	db.link.find({
		where: {id: decodedId}
	})
	.then(function(link) {
		// then get url data
		var daUrl = link.url;
		// use urlData to redirect to the url
		res.redirect(daUrl); 
	})

})



// get, redirect



// listen

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
