//REQUIRES
var express = require('express');
var bodyParser = require("body-parser");
var Hashids = require('hashids');

//VARIABLES
var app = express();
//var db = require("./models"); // require entire models folder
var hashids = new Hashids("saltyowls");
var db = require("./models"); 

//USE
app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));


//ROUTES

app.get('/', function(req, res) {
	var hash = hashids.encode(6);
	console.log(hash);
  res.render("inputForm");
});


//Accepts data from the form. 
//Stores the URL in the database and redirects to the show route.
app.post('/links', function(req, res) {
	db.link.create({
			url: req.body.urlInput,
		}).then(function(link){ //<-- returning new author created
			var hash = hashids.encode(link.id);
			console.log(hash);
			console.log(link.id);
			if(link){
				
				res.send('<a href="' + link.url + '">' + hash + '</a>/');
				//res.redirect("/links/" + link.id);
			}
			else {
				res.send("An error occured"); //<--- if no author was entered, not created successfully
			}
	});	
});

//Displays the short URL of the specified id (so the user can copy / share it)
app.get('/links/:id', function(req, res) {
	console.log('links id req.body' + req.body);
	db.link.findOne({
		id: req.params.id
	}).then(function(link){
		res.send(link.url);

	});	
});

//Takes the hash and redirects the user to the URL stored in the database.
app.get('/:hash', function(req, res) {
	console.log(req.body);
	res.send("redirect");
});






//LISTEN

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

















