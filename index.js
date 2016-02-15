var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');
var request = require('request');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
// app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

// app.get('/my-simple-urls', function (req, res) {
// 	res.send("My simple urls");
// });

app.post('/simple-url', function(req, res) {
	var url = req.body.link;
	console.log(url);
	db.urls.findOrCreate({
		where: {
			link: url
		}
	}).spread(function(link, created) {
		var newHashId = hashids.encode(link.id);
		var newUrl = 'kninja/simple-url/'+newHashId;
		link.hash = newHashId;
		link.save();
		res.render('showUrl', {
			link: newUrl
		});
	});
});

app.listen(3000);


	// var newHash = hashids.encode(url);
	// console.log(newHash);
	// var newUrl = 'kninja/simple-url/'+newHashId;
	// console.log(newUrl);
	// res.render('showUrl', {
	// 	link: newHash
	// });
	// var newHash = hashids.encode(data);
	// console.log(newHash);
	// var newLink = 'kninja/simple-url/'+newHash;
	// console.log(newLink);
	// res.render('showUrl', {
	// 	link: link,
	// 	shortLink: newLink
	// });	
	// res.redirect('/');

