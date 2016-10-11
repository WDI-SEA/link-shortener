// requires
var express = require('express');
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//vars
var app = express();
// var db = require ("./models");

//set and use
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('morgan')('dev'));



//routes
//GET '/' - home page with form to enter url
app.get('/', function(req, res) {
	res.render("home");
});


//POST '/links' - create link - accept data from form - store url in db - redirect to show route
app.post("/links", function(req, res){
		db.link.create({
			id: req.body.id, //left side - coming from sql table. right side - coming from form
			url: req.body.url // left - variable from sql talbe. right - variable from form
		}).then(function(link){
			if(link){
				res.redirect("/links/:id"); // redirects to show page
			}
			else {
				res.send("An error occured");
			}
		});
	// console.log(req.body); // prints entire object
	// res.send("post route was reached successfully");
});


//GET '/links/:id' - show link - display the shortened URL
app.get('/links/:id', function(req, res) {
	res.render("show");
});


//GET '/:hash' - redirect - take hash and redirect user to url stored in db
app.get('/:hash', function(req, res) {
	res.redirect(url);
});







//listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
