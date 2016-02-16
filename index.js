var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
var db = require('./models');
var Hashids = require("hashids"),
	hashids = new Hashids("this is my salt");

var id = hashids.encode(12345);

app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(_dirname = "/static"));
app.use(ejsLayouts);


app.get('/', function(req,res) {
	res.render('index.ejs')
});


app.get('/links/:id', function(req,res) {
	var id = req.params.id;
	db.link.findById(id).then(function(row) {
		res.render('show.ejs', {row})
	});
	
});


app.post('/links', function(req,res) {
	var toShorten = req.body.longlink;
	db.link.findOrCreate({where: {url: toShorten} })
	.spread(function(row) {
		var hashname = hashids.encode(row.id);
		row.updateAttributes( {hash: hashname});
		res.redirect('/links/'+row.id);
	});
	
});


app.get('/links', function(req, res){
	var link = link.search;
    db.link.findAll({order: 'count DESC'})
        .then(function(row){
            res.render('allLinks.ejs', 
            	{row: link})
        });
});


app.get('/:hash', function(req,res) {
	var hash = req.params.hash;
	db.link.findOne({where: {hash: hash} })
	.then(function(row) {
			res.redirect( 
			'http://'+row.url );
			console.log(row.url);
			if ( row.count == null ) {
			row.updateAttributes( {count: 0})
			}
		 	row.count += 1; 
		 	row.save();
	});

});



app.listen(3000);