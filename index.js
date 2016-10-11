//REQUIRES
var express = require('express');
var bodyParser = require("body-parser");
var Hashids = require('hashids');

//VARIABLES
var app = express();
var hashids = new Hashids("saltyowls", 5);
var db = require("./models"); 

//USE
app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));


//ROUTES

//Homepage 
app.get('/', function(req, res) {
	res.render("inputForm");
});


//Accepts data from the form. 
//Stores the URL in the database and redirects to the show route.
app.post('/links', function(req, res) {
	db.link.create({
		url: req.body.urlInput,
	}).then(function(link){ 
		res.redirect("/links/" + link.id);
	});	
});

//Displays the short URL of the specified id (so the user can copy / share it)
app.get('/links/:id', function(req, res) {
	db.link.findOne({
		where: {id: req.params.id}
	}).then(function(link){
		var hash = hashids.encode(link.id);
		res.render("shortenedUrl", {link: link, hash: hash});
	});	
});

//Takes the hash and redirects the user to the URL stored in the database.
app.get('/:hash', function(req, res){
	var dehashed = hashids.decode(req.params.hash);
	db.link.findOne({
		where: {id: dehashed[0]}
  	}).then(function(link, err){
    	res.redirect(link.dataValues.url);
  	});
});


//LISTEN

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

















