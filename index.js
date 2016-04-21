var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
	res.render('index');
});

app.get('/links-show', function(req,res) {
	db.link.findAll().then(function(links) {
		res.render('links-show', {links, links});
	});
});

app.post('/', function(req, res) {
	db.link.findOrCreate({where: {
		url: req.body.url
	}}).spread(function(url, isNew) {
		if(isNew) {
			res.redirect('/links-show');
		} else {
			res.redirect('/');
		}
	}).catch(function(err) {
		res.send(err);
	})
});

app.get('/link/:id', function(req, res) {
	//need req.body.params

	res.render('/link', {link: link});
});

app.get('/links/:hash', function(req, res) {

});








var port = 3000;
app.listen(port, function() {
	console.log('Welcome welcome, you\'re far to find. Welcome to the port of ' + port);
});