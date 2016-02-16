var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db = require("./models");
var request = require("request");
var router = express.Router();
var Hashids = require("hashids"),
	hashids = new Hashids("Salty AF and Diabetes");
 

var submitLink;

app.set("view engine", "ejs"),
app.use(bodyParser.urlencoded({extended: false}));

// var ejsLayouts = require("express-ejs-layouts");
// app.use(ejsLayouts);

// Home Page
app.get("/", function(req, res){
	res.render("index.ejs")
});

app.post('/links', function(req, res) {
	var fullLink = req.body.fullLink;
	console.log(fullLink);
	if (fullLink.indexOf('http://') == -1) {
		fullLink = "http://"+fullLink;
		console.log(fullLink);
	} request(fullLink, function(error, response) {
		if (!error && response.statusCode == 200){
			db.link.findOrCreate({where: {url: fullLink}})
			.spread(function(link, created) {
				if(link.clicks === null){
					link.updateAttributes({
						clicks: 0
					});
				}
		}).then(function() {
			db.link.find({where: {url: fullLink}})
			.then(function(link) {
				var hash = hashids.encode(link.id);
				link.updateAttributes({
					hash: hash
				});
				res.redirect("/"+hash);
			});
		});
		}
	});
});

app.get("/link/:id", function(req, res) {
	var hashid = req.params.id;
		db.link.find({where: {hash: hashid}})
			.then(function(link) {
				var url = link.url;
				var hashid = link.hash;
				var clicks = link.clicks;
				res.render("links/shortened.ejs", {
					url: url,
					hashid: hashid,
					clicks: clicks
				});
			});
});

app.get("/links", function(req, res) {
	db.link.findAll({order: 'clicks DESC'})
		.then(function(link){
			res.render('links/links.ejs', {
				url: url,
				clicks: clicks

			});
		});
});

app.get("/:hash", function(req, res) {
	var hashid = req.params.id;
	db.link.find({where: {hash: hashid}})
	.then(function(link) {
		var site = link.url;
		var clicks = link.clicks;
		link.updateAttributes({
			clicks: clicks + 1
		});
		res.redirect(site);
	});
});





var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Running on port " + port);
});