var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require('hashids');
var Sequelize = require('sequelize');


var app = express();
var db = require("./models");
var hashids = new Hashids("this is my salt");


app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);


//home
app.get('/', function(req, res) {
  res.render("layout");
});

//create link
//stort in the database
//hash in the promise
app.post('/links', function(req, res) {
  db.link.create({
    url: req.body.url
  }).then(function(link){
    res.redirect('links/' + link.id);
  });
});


//show link
//incorporate hash here
app.get("/links/:id", function(req, res) {
	var hash = hashids.encode(req.params.id);
	res.render("show", { hash: hash });
});

//redirect
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
