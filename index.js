var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt', 5);
var request = require('request');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/links', function(req, res) {
	var url = req.body.link;
	db.urls.findOrCreate({
		where: {
			link: url
		}
	}).spread(function(link, created) {
		var newHashId = hashids.encode(link.id);
		var newUrl = 'http://localhost:3000/'+newHashId;
		link.hash = newUrl;
		link.save();
		res.render('showUrl', {
			shortLink: newUrl,
			longUrl: url
		});
	});
}); 

app.get('/links/all', function (req, res) {
	db.urls.findAll().then(function(urls) {
		res.render('myUrls', {urls: urls});
	});
});

app.get('/:id', function(req, res) {
	db.urls.findById(req.params.id).then(function(urls) {
		res.redirect(urls.link);
		var currentCount = urls.clicks;
		currentCount++;
		urls.updateAttributes({
			clicks: currentCount
		});
	});
});

app.listen(3000);
