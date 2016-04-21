// external requires
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Hashids = require("hashids");

// local requires
var Url = require('./models/url.js');
var app = express();

// middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));

mongoose.connect('mongodb://localhost/link-shortener');

var hashids = new Hashids("isadalawatatlo");

// Routes

// Home page
app.get('/', function(req, res) {
	res.render("index", {requested: false, fullurl: '', shorturl: ''});
});

// List urls -- This route is not advertised, just used for viewing database.
app.get('/urls-gimme', function(req, res) {
	Url.find({}, function(err, urls) {
		res.send(urls);
	});
});

// Save urls
app.post('/urls', function(req, res) {
	Url.count({fullurl: req.body.url}, function(err, count) {
		if(!err && count === 0) {
			console.log("---Creating and Saving new item.");
			var item = new Url({fullurl: req.body.url, click: 0});
			item.save(function(err, doc) {
				console.log(doc);
				console.log("hashID:" + hashids.encode(doc._id));
				var shorturl = req.headers.host + "/" + hashids.encodeHex(doc._id);
				//res.send(req.headers.host + "/" + hashids.encodeHex(doc._id));
				res.render('index', {requested: true, fullurl: req.body.url, shorturl: shorturl});
			});
		}
		else if(!err && count === 1) {
			console.log("---Item already exists. Finding and returning item.");
			Url.findOne({fullurl: req.body.url}, function(err, doc) {
				console.log(doc);
				console.log("hashID:" + hashids.encode(doc._id));
				var shorturl = req.headers.host + "/" + hashids.encodeHex(doc._id);
				//res.send(req.headers.host + "/" + hashids.encodeHex(doc._id));
				res.render('index', {requested: true, fullurl: req.body.url, shorturl: shorturl});
			});
		}
		else {
			console.log("---Something went wrong.");
			res.send(err);
		}
	});
});

// Show urls
app.get('/:hashID', function(req, res) {
	Url.count({_id: hashids.decodeHex(req.params.hashID)}, function(err, count) {
		if(!err && count === 0) {
			console.log("---Not a valid hash ID");
			res.send("Not a valid hashID");
		}
		else if(!err && count === 1) {
			console.log("---Looking up full URL and incrementing count");
			Url.findById(hashids.decodeHex(req.params.hashID), function(err, doc) {
				doc.click = doc.click + 1;
				doc.save(function(err){
					if(!err){
						res.redirect(doc.fullurl);
					}
				});
			});
		}
	});
});

app.listen(3000);