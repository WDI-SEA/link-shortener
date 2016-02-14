var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Hashids = require("hashids");
var hashids = new Hashids("saltines");
var db = require("./models")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.post("/links", function(req, res) {
	var originalUrl = req.body.originalUrl;
	if (originalUrl.indexOf("http") != 0) {
		originalUrl = "http://" + originalUrl;
	}
	db.url.create({
		url: originalUrl,
		count: 0
	}).then(function(data) {
		res.redirect("/links/" + data.id);
	});
});

app.get("/links", function(req, res) {
	db.url.findAll({
		order: 'count DESC'
	}).then(function(urls) {
		var links = urls; 
		res.render("links.ejs", {
			links: links	
		});
	});
});

app.get("/links/:id", function(req, res) {
	var id = parseInt(req.params.id);
	var hash = hashids.encode(id);

	db.url.find({
		where: {
			id:id
		}
	}).then(function(url) {
		res.render("index.ejs", {
			shortUrl: "localhost:3000/" + hash,
			count: url.count
		});
	});	
});

app.get("/:hash", function(req, res) {
	var hash = req.params.hash;
	var id = hashids.decode(hash);
	db.url.find({
		where: {
			id:id
		}
	}).then(function(url) {
		url.count += 1;
		url.save();
		res.redirect(url.url);
	});
});

app.listen(3000);