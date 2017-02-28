var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models')

var Hashids = require('hashids')
var hashids = new Hashids ('this is my salt');
var hash = hashids.encode(12345);
var linkId = hashids.decode("NkK9");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/links/:id', function(req, res) {
//hash id
	var hash = hashids.encode(req.params.id);
	console.log(hash)
	res.send(hash)
  // res.render('link');
});

app.get('/:hash', function(req, res){
	var hash = req.params.hash
	var linkId = hashids.decode(hash);
	db.link.find({
		where: {id: linkId}
	}).then(function(object){
		res.redirect(object.url)
	})
})

app.post('/', function(req, res){
	// res.send(req.body);
	// res.send(hashids.encode(req.body.url));
	//.then(function(object)) - gives back object
	db.link.create(req.body).then(function(object){
		res.redirect('/links/'+object.id)
	});
});



var server = app.listen(process.env.PORT || 3000);

module.exports = server;
