/*Link Shortening web app - generate a short address to replace the address 
entered. Display the address to the user and redirect to the original link*/

/*Main index.js file for the webserver, creates routes and handles traffic*/

/*self closing function to contain the code so as to isolate variables and 
global variables. Closes at the end of the code.*/
(function(){

var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");
var Hashids = require("hashids"),
	hashids = new Hashids("ARRG Captain, tis truely a salty sea #SoSalty");
var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/static"));

/*set up the home route and render index.ejs*/
app.get("/", function(req, res){
	res.render("index.ejs");
});

/*set up route /link and send the web address to the database if it is a unique
address. Once it gets there access the unique identifier it was given. pass that 
identifier to the hashid algorithm which generates a short code based on the value 
of the ID. Counter is set to 0 if it was previously unused (eg, null). The counter
and hashid values are added to the database.*/ 
app.post("/link", function(req, res){
	var linkToShorten = req.body.linkToShorten;
	db.linkToShorten.findOrCreate({where: {link: linkToShorten}})
	.spread(function(link, created){
		if (link.count === null){
			link.updateAttributes({
				count: 0
			});
		}
	})
	.then(function(){
		db.linkToShorten.find({where: {link: linkToShorten}})
		.then(function(link){
		   	var id = hashids.encode(link.id);
		   	link.updateAttributes({
		   		short: id
		   	});	
		   	res.redirect("/link/"+id);
		});
	});
});

/*sets up a route for any webroute that has an id after link/ route. Once this path 
is activated the link/link.ejs file is rendered and the global variables address, hashid 
and count are passed to link.ejs and the file is rendered*/
app.get("/link/:id", function(req, res){
  	var hashid = req.params.id;
  	   	db.linkToShorten.find({where: {short: hashid}})
  	   		.then(function(link){
          		var address = link.link;
          		var hashid = link.short;
          		var count = link.count;
          		res.render("link/link.ejs", {
          			address: address,
          			hashid: hashid,
          			count: count
          		});
       		});
  	}
);

/*sets up a route for /link/index which displays all the stored shortened weblinks*/
app.get("/index", function(req, res){
	db.linkToShorten.findAll({order: 'count DESC'})
		.then(function(link){
			console.log(link);
			res.render("link/index.ejs", {
				link: link
			});
		});
});

/*sets up route for /:hash where the hashid is placed after the '/' and the user is redirected to
the address associated with that hashid. In addition the count value for the database is incremented
keeping track of how many times the shortened like is used*/
app.get("/:hash", function(req, res){
   var hashid = req.params.hash;
   db.linkToShorten.find({where: {short: hashid}}).then(function(link){
      var address = link.link;
      var count = link.count;
      link.updateAttributes({
		    count: count + 1
		  });
      res.redirect("http://"+address);
   });
});


app.listen(3000);

}());