var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/static"));
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.get('/', function(req, res) {
	res.render('index.ejs');

});

app.post('/links', function(req, res) {
	db.link.create({
		url: req.body.link
	}).then(function(saved) {
		var hash = hashids.encode(saved.id);
		// console.log(saved.id, saved.url, saved.hash);
		saved.hash = hash 
		saved.save()
		res.redirect('/links/' + saved.id); //1 is a temporary id 
	})
});

app.get('/links/:id', function(req, res) {
	db.link.findById(req.params.id).then(function(foundLink) {
		res.render('showlink.ejs', {link: foundLink});

	})
});

app.get('/:hash', function(req, res) {
	db.link.findOne({where: {hash: req.params.hash}}).then(function(saved) {
		console.log(saved)
		saved.count = saved.count + 1;
		saved.save();
		res.redirect(saved.url);  //redirects to a url
	})
});

app.get('/count/:hash', function(req, res) {
	db.link.findOne({where: {hash: req.params.hash}}).then(function(foundresponse) {
		res.render('redirectshow.ejs', {link: foundresponse})

	})
});

// app.get('/links',function(req, res) {
// 	db.link.findAll({order: 'count DESC'}).then(function(sortedlinks) {
// 		console.log(sortedlinks);
// 		res.render('sortedlinks.ejs', {links: sortedlinks})

// 	})
	
// });










app.listen(3000);