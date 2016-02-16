var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids');
var	hashids = new Hashids('evwilkin');
 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

//Load home page
app.get('/', function(req, res) {
	res.render("index");
});

app.get('/links', function(req, res) {
	db.link.findAll({ order: 'clickcount DESC'}).then(function(link) {
		res.render('list', {
			list: link
		});
	});
});

//Submit link
app.post('/links', function(req, res) {
	var id = req.body.id;  //id is the actual URL submitted to shorten

	db.link.findOrCreate({
		where: {
			url: id
		}
	}).spread(function(row, isNew) {  //isNew returns true if it's a new link false if it already exists
		if (isNew) {
			var linkID = row.id;  //linkID is the unique ID (row number) in the database
			var newHash = hashids.encode(linkID);  //newHash is the shortened hashid
			//assign hashid to this row where it is currently null
			row.updateAttributes({
				hash: newHash,
				clickcount: 0
			});
			res.redirect("/links/" + linkID/*, { row }*/);
		} else {
			//link already exists, simply forward to existing unique ID (row number) in database
			res.redirect("/links/" + row.id/*, { row }*/);
		}
	});
});

app.get('/links/:id', function(req, res) {
	var id = req.params.id;  //id is the row ID 
	db.link.find({
		where: {
			id: id
		}
	}).then(function(row) {
		var url = row.url;
		var hash = row.hash;
		var clickcount = row.clickcount;
		res.render("links", { url: url, hash: hash, clickcount: clickcount });
	});
});

app.get('/:hash', function(req,res) {
	var hash = req.params.hash;
	//find hash in db and redirect user to original site
	db.link.find({
		where: {
			hash: hash
		}
	}).then(function(row) {
		row.updateAttributes({
			clickcount: ++row.clickcount
		});
		res.redirect(row.url);
	});
});

app.listen(3000);