var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/static"));


app.get("/", function(req, res){
	res.render("index.ejs");
});

app.post("/link", function(req, res){
	var linkToShorten = req.body.linkToShorten;
	db.linkToShorten.create({
		link: linkToShorten
	}).then(function(){
		res.render("link/link.ejs");
	});
	
});

app.get("/link/:id", function(req, res){

});

app.get("/:hash", function(req, res){

});


app.listen(3000);