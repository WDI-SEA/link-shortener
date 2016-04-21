var express = require("express");
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var request = require('request');
var db = require('./models');
var Hashids = require("hashids"),
	hashids = new Hashids("Always Sunny in Philadelphia", 6)

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get("/", function(req, res) {
	res.render('index');
});

app.get("/:hash", function(req, res) {
	var hash = req.params.hash;
	var longUrl = hashids.decode(hash);
	db.link.find({where: {url: longUrl}}).then(function(url){
		res.redirect(url)
	})
	// res.render('index');
});

app.post('/links', function(req, res) {
	db.link.findOrCreate({
  	where: {
  		url: req.body.enterUrl,
  		// hash: urlHash
  	}}).spread(function(url, created) {
  		if(created) {

  			
  			hashId = hashids.encode(url.id)
  			res.sendStatus(hashId);
  		} else {
  			hashId = hashids.encode(url.id)
  			res.sendStatus(hashId);
  			console.log(url);
  			console.log(urlHash);
  		}
  	})
	// res.send(req.body.enterUrl);


  // 	var hashids = new Hashids("Always Sunny in Philadelphia"),
	 //  id = hashids.encode(),
	 //  numbers = hashids.decode(id);
	 //  console.log(id);
		// console.log(numbers);
		// res.send(id + numbers)

})

app.get('/links:id', function(req, res) {
	console.log(req.body.enterUrl);
	res.send(req.body.enterUrl);
})

app.listen(process.env.PORT || 3000);