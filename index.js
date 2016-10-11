var express = require('express');
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var Hashids = require("hashids");

var app = express();
var db = require("./models");
var hashids = new Hashids("this is my salt");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


// Contains a simple form where a user can enter a URL and get a short URL
app.get("/", function(req, res) {
  res.render("home");
});

//Accepts data from the form. Stores the URL in the database and redirects to the show route.
app.post("/", function(req, res) {
	db.link.create({
		url: req.body.url
	}).then(function(link) {
		if(link) {
			res.redirect("/links/" + link.id);
		} else {			
			res.send("An eror has occured while shortening your url.")
		}
	})
});

// Displays the short URL of the specified id (so the user can copy / share it)
app.get("/links/:id", function(req, res) {
	var hash = hashids.encode(req.params.id);
	res.render("short-link", { hash: hash });
});

// Takes the hash and redirects the user to the URL stored in the database.
app.get("/:hash", function(req, res) {
	// console.log("the has is " + req.params.hash);
	// console.log("the id is " + hashids.decode(req.params.hash));
	// res.send("testing");
	db.link.findOne({
		where: {id: hashids.decode(req.params.hash)}
	}).then(function(link) {
		if(link) {
			res.redirect(link.url);
		} else {
			res.send("an error occured reading your short link.")
		}
	})
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
