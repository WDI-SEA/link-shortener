var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids'),
	 hashids = new Hashids("veggie burger")
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
	res.render('home');
});


var id = (12345);
console.log(hashids);
console.log(id);

app.post('/links', function(req, res) {
	db.link.create({url: req.body.url}).then(function(link) {
		console.log(link.id);
		var hash = hashids.encode(link.id);
		link.hash = hash;
		link.save().then(function(saved) {
		res.redirect('/links/' + link.id);	
		});
	});
});

app.get('/links/:id', function(req, res) {
	db.link.findOne({where: {id: req.params.id}}).then(function(link) {
		res.render('show', {link: link});
	});
});

app.get('/:hash', function(req, res) {
	db.link.findOne({where: {hash:req.params.hash}}).then(function(link) {
		res.redirect(link.url);
	})
})

app.listen(3000);