// GLOBAL VARIABLES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var Sequelize = require('sequelize');
var Hashids = require("hashids");
var hashids = new Hashids('I hate salt');

// SET/USE
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

// ROUTES
app.get('/', function(req, res) {
  res.render('show');
});

app.post('/links', function(req, res) {
	db.link.create({
		url: req.body.url
	}).then(function(link) {
		res.redirect('links/'+link.id);
	});
		
});

app.get('/links/:id', function(req, res) {
	db.link.findOne({
		where: {id: req.params.id}
	}).then(function(link) {
		var hash = hashids.encode(link.id);
		res.render('short', { link: link, hash: hash });
		
	});
	
});

app.get('/:hash', function(req, res) {
	var dehashed = hashids.decode(req.params.hash);
	db.link.findOne({
		where: {id: dehashed[0]}
  	}).then(function(link, err){
    	res.redirect(link.dataValues.url);
  	});
});

// LISTEN
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
