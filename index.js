var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var Hashids = require("hashids"),
	hashids = new Hashids("salt");
var db = require('./models')

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/show/:id', function(req, res) {
	db.link.findById(req.params.id)
	.then(function(row) {
	res.render('show', {row: row});
	});
});

app.post('/links', function(req, res) {
	db.link.create({
		url: req.body.longUrl
	}).then(function(row) {
		var hash = hashids.encode(row.id);
		row.updateAttributes({
			hash: hash 
		}).then(function(){
			res.redirect('/show/' + row.id);
		});
	});
});

app.get('/:hash', function(req, res) {
	db.link.findOne({
		where: { hash: req.params.hash}
	}).then(function(row) {
		res.redirect("http://" + row.url);
	});
});


app.listen(3000);
