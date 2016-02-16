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
	var URLreq = longURL.includes("http://");
	if (URLreq) {
	db.link.create({
		url: longURL
	}).then(function (link) {
		hashids = new Hashids("the saltiest of salts", 8);
		var newID = hashids.encode(link.id);
		link.updateAttributes({
			hash: newID,
			counter: 0
		})
		res.render('show.ejs', {shortURL: newID, URLcount: link.counter});
		})
	} else {
		res.send("Error! Pleae prefix your link with http://");
	  }
});


app.get("/links/:id", function(req, res) {
	var id = req.params.id;
	db.link.findById(id)
	.then(function (link) {
		var currentHash = link.hash;
		var currentCount = link.counter;
		res.render('show.ejs', {shortURL: currentHash, URLcount: currentCount});
	})
});


app.get("/links", function (req, res) {
	db.link.findAll({order: 'counter DESC'})
	.then(function (link) {
		res.render("links.ejs", {link:link});
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
		link.counter++;
		link.save();
	})
});


app.listen(3000);