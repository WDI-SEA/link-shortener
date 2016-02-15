var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var Hashids = require('hashids');
var hashids = new Hashids('salty random string');
//var newHash = hashids.encode(dbid);

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.post("/links", function(req, res) {
	var urlInput = req.body.urlInput;
	console.log(urlInput);
	db.link.create({
    	urlInput: urlInput
	});
	res.render("showurl.ejs");
	//console.log();
});

// app.get("/links/:id", function(req, res){
//   var  = req.body.q;
//   var linkId = req.params.id;

// });

//console.log(newHash);
//console.log(hashids.decode(newHash));

//app.use('/tacos', require('./controllers/tacos'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Currently on easy-listening station " + port);
});