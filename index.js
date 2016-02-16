var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require("hashids");
var db = require('./models');
var app = express();


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/links', function(req, res){
	db.link.findAll({
		order: 'count DESC'
	}).then(function(links){	
		res.render('links.ejs', {links:links});
	});
});


app.post('/links', function(req, res){
	var url = req.body.url;
	db.link.create({
		url: url, 
		count: 0
	}).then(function(link){
		var hashids = new Hashids("this is my super salty initial salt", 6);
		var id = hashids.encode(link.id);
		link.updateAttributes({
    	hash: id });
    	res.render('show.ejs', {id: id, count:link.count});
	});
});




app.get('/:hash', function(req, res){
	var hashid = req.params.hash;
	db.link.findOne({where: {hash: hashid}}).then(function(link){
		return link.increment('count', {by: 1})
	}).then(function(link){
		res.redirect(link.url)
	});
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});
