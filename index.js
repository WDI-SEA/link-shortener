var express = require('express');
var Hashids = require("hashids");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

var app = express();
var db = require("./models");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
	res.render("index");
});

app.get('/links', function(req, res) {
	res.render("links");
});

app.post('/links', function(req, res) {
	var hash = Hashids.encode(URLinput);
	db.link.create({
		url: req.body.hash
	}).then(function(link) {
		res.redirect('/links/' + link.id);
	});
});

app.get('links/:id', function(req, res) {
	db.link.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(link) {
		var hash = Hashids.encode(link.id);
		res.render('show', {
			link: link,
			hash: hash
		});
	});
});

app.get('/:hash', function(req, res) {
	var linkId = hashids.decode(req.params.hash);
	console.log(linkId);
	console.log('# ', req.params.hash);
	db.link.findOne({
		where: {
			id: linkId[0]
		}
	}).then(function(link, err) {
		res.redirect(link.dataValues.url);
	});
});



var server = app.listen(process.env.PORT || 3000);

module.exports = server;