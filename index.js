var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models')
var ejsLayouts = require('express-ejs-layouts')
var router = express.Router();
var Hashids = require('hashids');

var hashids = new Hashids("Hash");
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
	res.render('index.ejs');
})

app.post('/', function(req, res){
	var link = (req.body.url);
	console.log(link);
  hash = hashids.encode(link);
  console.log(hash);
	db.hash.create(link, hash).then(function(hash){
		res.redirect('/');
	})

})


module.exports = router;

app.listen(3000);