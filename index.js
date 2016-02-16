var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids'),
	hashids = new Hashids("I'm a salty sponge!", 8);

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static/'));

app.get('/', function(req,res) {
	res.render('index.ejs');
});

app.use('/links', require('./controllers/linksCtrl.js'));

app.listen(3000);