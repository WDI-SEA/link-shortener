var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var Hashids = require('hashids');

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
	db.link.create({
    	urlInput: urlInput
	}).then(function(link) {
		var hashids = new Hashids('salty random string', 8);
		var newHash = hashids.encode(link.id);
		link.updateAttributes({
			hash: newHash
		});
	
	res.redirect("/links/"+link.id);
	});	
	//console.log();
});

app.get("/links/:id", function(req, res){
	var link = req.params.id;
	db.link.findById(link).then(function(shortUrl) {
		var newHash = shortUrl.hash;
		res.render("links.ejs", {
			shortUrl: newHash,
			count: shortUrl.count

		});
	});     
});

app.get("/:hash", function (req, res) {
	var hash = req.params.hash;
	db.link.findOne({
		where: {
			hash: hash
		}
	}).then(function(link) {
		res.redirect(link.urlInput);
		link.count++;
		link.save();
	});
});



//console.log(newHash);
//console.log(hashids.decode(newHash));

//app.use('/tacos', require('./controllers/tacos'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Currently on easy-listening station " + port);
});