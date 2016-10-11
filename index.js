//Requires
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var ejsLayouts =  require("express-ejs-layouts");
var Hashids = require('hashids');
var hashids = new Hashids();




//Variables
var app = express();
var db = require("./models");



//Set & Use
app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));


//Routes


//Show the index view
app.get('/', function(req, res) {
  res.render("index.ejs");
});

//post the URL when button clicked, find it and display or create a new url
// in the database and register click count
app.post('/', function(req, res) {
	var link = req.body.url;

	console.log(req.body.url);
	db.link.findOrCreate({ 
		where: { url: link }
	}).spread(function(newRow, isNew){ //two responses, one is new row, one is boolean if created
		if(isNew){
			newRow.hash = hashids.encode(newRow.id);
			newRow.clickCount = 0;
			newRow.save();
		}
		res.redirect('/links/' + newRow.id);
	});
});


//body-parser pulls the id from the URL, passes link from table row
app.get('/links/:id/', function(req, res) {
	db.link.findById(req.params.id).then(function(link){
		if (link) {
			res.render("link.ejs", { row: link});
		}
	}); 
});

//IF ALREADY SET UP - body-parser is pulling the hash from URL and matching with database	
app.get('/:hash', function(req, res) {
	var hashid = req.params.hash;
	db.link.findOne({ where: {hash: hashid }}).then(function(row) {
		row.clickCount++;
		row.save();
		console.log(row.clickCount);
		res.redirect(row.url);
	});
});




//Listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
