var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var time = Date.now();
var Hashids = require('hashids'),
	hashids = new Hashids(time);
var db= require('./models');



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res) {
	res.render('index');
});


app.get('/shortner', function(req, res) {
	console.log("TEST");
});

app.post('/shortner', function(req, res){
	console.log('TEST POST');
	console.log(req.body);
	console.log(req.body.url);
	
	var id = hashids.encode(time);
	console.log(id);
	db.link.findOrCreate({
		where: {
			url: req.body.url,
			hash: id
		},

	})
	 res.send(req.body);
})

app.post("shortUrl", function(req, res){
	// res.render()
})


var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});  

