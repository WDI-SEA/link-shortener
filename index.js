/*Link Shortening web app - generate a short address to replace the address 
entered. Display the address to the user and redirect to the original link*/

/*Main index.js file for the webserver, creates routes and handles traffic*/

var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");

var Hashids = require("hashids"),
	hashids = new Hashids("this is my salt");

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/static"));

/*set up the home route and render index.ejs*/
app.get("/", function(req, res){
	res.render("index.ejs");
});

/*set up route /link and send the web address to the database. Once it gets there
access the unique identifier it was given. pass that identifier to the hashid 
algorithm which generates a short code based on the value of the ID. the short
code is then send to the database, updating the entry for the web address. 
the link.ejs file is then rendered*/ 
app.post("/link", function(req, res){
	var linkToShorten = req.body.linkToShorten;
	db.linkToShorten.create({
		link: linkToShorten
	}).then(function(){
		db.linkToShorten.find({where: {link: linkToShorten}}).then(function(link){
		  var id = hashids.encode(link.id);
		  link.updateAttributes({
		    short: id
		  });	
		  var address = link.link;
		  var hashid = link.short;
		  res.render("link/link.ejs", {
		  	address: address,
		  	hashid: hashid
		  });	  
		});
	});
});



app.get("/link/:id", function(req, res){

});

app.get("/:hash", function(req, res){

});


app.listen(3000);

