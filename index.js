var express = require('express');
var db = require('./models');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var hashids = new Hashids("So salty");

app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));//bodyparser requires this
app.set("view engine", "ejs");

//Form where you can enter url and get back a short url
app.get("/", function(req, res) {
  res.render("index");
});

//Takes data from form and keeps URL in the database and redirects to the show route
app.post("/", function(req, res) {
	db.link.create({
		url: req.body.url
	}).then(function(link) {
		if(link) {
			res.redirect("/links/" + link.id);
		} else {			
			res.send("Err nerr you get no url!")
		}
	})
});

app.get("/links/:id", function(req, res) {
	var hash = hashids.encode(req.params.id);
	res.render("short-link", { hash: hash });
});

// Uses hash to redirect to the URL stored in the database.
app.get("/:hash", function(req, res) {
	db.link.findOne({
		where: {id: hashids.decode(req.params.hash)}
	}).then(function(link) {
		if(link) {
			res.redirect(link.url);
		} else {
			res.send("Err nerr you get no url!")
		}
	})
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
