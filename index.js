var express = require('express');
var db = require('./models');
var Hashids = require('hashids');
//var request = require('request');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
var ejslayouts = require('express-ejs-layouts');
app.use(ejslayouts);

hashids = new Hashids("Kripp is salty");

app.get('/', function(req, res){
	res.render('index.ejs');
	
});

app.get('/links/:id', function(req, res){
	var linkID = req.params.id;
	db.links.find({
		where:{
			id: linkID
		}
	}).then(function(link){
		res.render("links.ejs", {link:link});
	})
	
	
});

app.post ("/links", function(req,res){
	var newLink = req.body.s;
	hashids = new Hashids(newLink);
	console.log(newLink);
	var hashid = hashids.encode(1337);
	console.log("grm"+hashid);
	if (newLink){
		db.links.findOrCreate({
			where:{
				url: newLink
			},
			defaults:{
				hash: hashid,
				clicks: 0
			}
		}).spread(function(author, created){
			var linkid=author.get('id');
			res.redirect("links/"+linkid);
		});
	}else{
	
	res.render('links.ejs')
}

});

app.get('/:hash', function(req,res){
	var hasher= req.params.hash;
	console.log(hasher);
	db.links.find({
		where: {
			hash: hasher
		}
	}).then(function(link){
		var click = link.clicks;
		click++;
		console.log("click"+click);
		link.updateAttributes({
			clicks: click
		});
		res.redirect(link.url);
	});
});

app.get("/links", function(req,res){
	db.links.findAll({
		sort: 'clicks DESC'
	}).then(function(stuff){
		res.render('show.ejs',{stuff:stuff});
	});
});



app.listen(3000);