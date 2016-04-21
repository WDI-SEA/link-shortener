var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db= require('./models');



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res) {
	res.render('index');
});

// app.get('/shortner', function(req, res) {
//   res.render('signups');
// });

app.get('/shortner', function(req, res) {
	console.log("TEST");
});

app.post('/shortner', function(req, res){
	console.log('TEST POST');
	console.log(req.body);
	console.log(req.body.url);

	db.link.findOrCreate({
		where: {
			url: req.body.url,
		},

	})
	 res.send(req.body);
})



var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});  

