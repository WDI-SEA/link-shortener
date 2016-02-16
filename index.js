var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var count;

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

var Hashids = require('Hashids');
var hashids = new Hashids('my shortie');


app.get("/", function(req, res){
	res.render("index");
});

app.get("/links/:id", function(req, res) {
	var link = req.params.id;
	db.links.findById(link).then(function(links){
		res.render("links.ejs", {
			links: links	
		});
	});
});

app.get("/:hash", function(req, res) {
	var hash = req.params.hash;

	db.links.find({where:{linkHash:hash}})
	.then(function(row){
		row.count++;
		console.log("*******count: ", row.count);
	 	row.updateAttributes({count: row.count});
		res.redirect(row.linkUrl);
	});

});

app.post("/", function(req, res){
	db.links.findOrCreate({
		where: {linkUrl: req.body.linkUrl}
	})
	.spread(function(links) {
		var Hashids = hashids.encode(links.id);
		links.updateAttributes({linkHash: Hashids, count: 0});
    	res.redirect('/links/'+links.id);

    	// res.send(links);
  })

});

app.get("/popular", function(req, res) {
	res.render("popular");
});



app.listen(3000);