var express = require('express');
var db = require('./models');
var app = express();
var bodyParser = require('body-parser');
var Hashids = require("hashids")
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/static'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

var request = require("request");

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.post("/links", function(req, res) {
	var longURL = req.body.longURL;
	//include logic that forces the user to enter http:// as part of their URL
	db.link.create({
		url: longURL
	}).then(function (link) {
		hashids = new Hashids("the saltiest of salts", 8);
		var newID = hashids.encode(link.id);
		link.updateAttributes({
			hash: newID
		})
		res.render('show.ejs', {shortURL: newID});
	})
});


app.get("/links/:id", function(req, res) {
	var id = req.params.id;
	db.link.findById(id)
	.then(function (link) {
		var currentHash = link.hash;
	res.render('show.ejs', {shortURL: currentHash});
	})
});

app.get("/:hash", function(req, res) {
	var hash = req.params.hash;
	db.link.findOne({
		where: {
			hash: hash
		} 
	})
	.then(function (link) {
		var currentURL = link.url;
	res.redirect(currentURL);
	})
});

//app.get("/links") 
//this will be the display of all links sorted by most clicked

app.listen(3000);