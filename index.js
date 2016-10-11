var express = require('express');
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();
var db = require("./models");
var Hashids = require('hashids');
var hashids = new Hashids("whatever", 5);

app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));


//form
app.get('/', function(req, res) {
  res.render("home");
  

});

// console.log(req.body);
	// res.send("ayy");
	// storess url in the database - redirects
app.post('/links', function(req, res){
	db.link.create({
		url: req.body.urlInput
	}).then(function(link){
		res.redirect("/links/" + link.id);
	});
});

//show link to route
app.get('/links/:id', function(req, res){
	db.link.findOne({
		where: {id: req.params.id}
	}).then(function(link){
		var hash = hashids.encode(link.id);
		res.render("redirect", {link: link, hash: hash});
	});
});

// decode then take you to actual url
app.get('/:hash', function(req, res){
	var unhashed = hashids.decode(req.params.hash);
	db.link.findOne({
		where: {id: unhashed[0]}
	}).then(function(link, err){
		res.redirect(link.dataValue.url);
	});	 
});
var server = app.listen(process.env.PORT || 3000);

module.exports = server;

