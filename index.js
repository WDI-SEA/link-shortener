var express = require('express');
var app = express();
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
var Hashids = require("hashids");
var hashids = new Hashids("Fine Dining..... and breathing!");


app.use(require('morgan')('dev'));
app.set("view engine", "ejs");

//render a form to enter a url
app.get('/', function(req, res) {
  res.render("index");
});

//post the url to the db and redirect to the 'show' page
app.post("/", function(req, res) {
 	db.link.create({
 	url: req.body.url
 	}).then(function(link) {
 		if(link) {
 			res.redirect("/links/" + link.id);
 		} else {			
 			res.send("Something went wrong!!!")
 		}
	})
 });

//encode the inputted url and display it
app.get("/links/:id", function(req, res) {
 	var hash = hashids.encode(req.params.id);
	res.render("short-link", { hash: hash });
 });

//direct user to the original url when they click the shortened version
app.get("/:hash", function(req, res) {
 	db.link.findOne({
 		where: {id: hashids.decode(req.params.hash)}
 	}).then(function(link) {
 		if(link) {
 			res.redirect(link.url);
 		} else {
 			res.send("That doesnt appear to be a valid url. try again");
 		}
 	})
  });

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
