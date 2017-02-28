var express = require('express');
var bodyParser = require("body-parser");
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");
var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts)
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('home');
});

app.post("/links", function(req, res) {
	db.link.create(req.body)
	.then(function(link) {
		res.redirect('./links/' + link.id);
	})
});

app.get('/links/:id', function(req, res) {
	var hash = hashids.encode(req.params.id);
	var hashObj = {
		id: hash
	}
	db.link.find({
		where: {
			id: req.params.id
		}
	}).then(function(links) {
		res.render('links', {links: links, hashObj: hashObj});	
	})
});

app.get('/:hash', function(req, res) {
	var linkId = hashids.decode(req.params.hash);
	db.link.find({
		where: {
			id: linkId
		}
	}).then(function(links) {
		res.redirect("http://" + links.link);
	})
});



var server = app.listen(process.env.PORT || 3000);

module.exports = server;
