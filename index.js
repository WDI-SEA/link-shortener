var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require('hashids');
var hashids = new Hashids('Testing...');

app.set('view engine', 'ejs');

app.use(ejsLayouts);

app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
	var box = req.body.urlBox;
	if (box) {
		res.send(box);
	}
});

// Accepts data from the form

app.post('/links', function(req, res) {

	console.log(shorten);

	var small = hashids.encode(req.body.shorten);

	db.links.create( {
		url: small
	}).then(function(link) {
		if (link) {
			res.redirect('index');
		} else {
			res.send('An error occurred.');
		}
	})
});

app.get('/links', function(req, res) {
	res.render('links');
});

app.get('/:hash', function(req, res) {
	res.redirect('');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
