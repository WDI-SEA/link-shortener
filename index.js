var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids'),
	hashids = new Hashids('evwilkin');
 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render("index");
});

app.post('/links', function(req, res) {
	var id = req.body.id;
	res.redirect('/links/' + id);
});

app.get('/links/:id', function(req, res) {
	var id = req.params.id;
	db.link.create({
		url: id
	}).then(console.log("Added " + id));
	var shortLink = hashids.encode(id);
	db.link.create({
		url: shortLink
	}).then(console.log("Added " + id));
	var returnLink = hashids.decode(shortLink);
	db.link.create({
		url: returnLink
	}).then(console.log("Added " + id));
	console.log()
	res.render("links", { id: id});
});

app.get('/:hash', function(req,res) {

});

app.listen(3000);