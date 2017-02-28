//Requires & Global Vars
var express = require('express');
var db = require('./models');
// var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');
var app = express();

//Set & Use Statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//Routes
//Contains a simple form where a user can enter a URL and get a short URL
app.get('/', function(req,res) {
res.render('index');
});

//Accepts data from the form. Stores the URL in the database and redirects to the show route.
app.post('/links', function(req,res){
	db.link.create({
		url: req.body.url
	}).then(function(link) {
		res.redirect('/links' + link.id);
	}).catch(function(err) {
		res.send({ message: 'error', error: err })
	});
});

//Displays the short URL of the specified id (so the user can copy / share it)
app.get('/links/:id', function(req,res){
	db.link.find({
		where: {
			id: req.params.id
		},
	}).then(function(link) {
	var linkId = hashids.encode(link.id);
	res.render('links', {linkId:linkId});	
	});
});

//Takes the hash and redirects the user to the URL stored in the database.
app.get('/:hash', function(req,res){
var linkId = hashids.decode(req.params.hash);
db.link.find({
	where: {id: linkId}
}).then(function(link){
	res.redirect('http://' + link.link)
})
});

//Listener
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
