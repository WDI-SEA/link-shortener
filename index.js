var express = require("express");
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var request = require('request');
var db = require('./models');
var Hashids = require("hashids"),
	hashids = new Hashids("Always Sunny in Philadelphia", 6)

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get("/", function(req, res) {
	res.render('index');
});


app.post('/links', function(req, res) {
	console.log(req.body.enterUrl);
	db.link.create({
  		url: req.body.enterUrl,
  		count: 0
  		// hash: urlHash
  	}).then(function(url) {
  			urlHash = hashids.encode(url.id)
  			url.hash = urlHash;
  			url.save().then(function(url) {
  				console.log(url)
  				res.render('show', {hash: urlHash})
  			});
  		});
  	});


app.get('/links', function(req, res) {
	db.link.findAll({order: [['count', 'DESC']]}).then(function(urls){
		res.render('links', {urls: urls})
	});
});

app.get("/:hash", function(req, res) {
	var hash = req.params.hash;
	var urlId = hashids.decode(hash);
	db.link.find({where: {id: urlId}}).then(function(url){
		url.count = url.count + 1
		url.save().then(function(url){
			res.redirect(url.url);
		})
	})
});


app.listen(process.env.PORT || 3000);