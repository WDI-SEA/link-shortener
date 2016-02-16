var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var ejsLayouts =  require("express-ejs-layouts")
var db = require("./models");
var Hashids = require("hashids"),
	hashids = new Hashids("this is my salt");




app.use(express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);

app.get("/",function(req,res){


	res.render("index.ejs");
});

app.get("/links/:id", function(req, res){
	var id = req.params.id 
	db.links.findById(id).then(function(link){
		res.render("linkShortner",{link:link});
	});
});

app.get("/findAll", function(req,res){
	db.links.findAll({order: 'counter DESC'}).then(function(link){
		res.render("showAllLinks.ejs", {links: link})
	});
});

app.get("/:hash", function(req,res){
	var hasher = req.params.hash;
	
	db.links.find({ where :
		{ hash: hasher}}).then(function(row){
			row.counter++;
			row.save();
			console.log(row.counter);
			res.redirect(row.url);
		});
});

app.post("/links",function(req,res){
	var link = req.body.linkName;
	
	db.links.findOrCreate({
		where:{
		url : link
		
		
	}
}).spread(function(link, created){
	var hash = hashids.encode(link.id);
		if(created == true){
			link.counter = 0;

			link.hash = hash;
		
			link.save();

			res.redirect("/links/" + link.id );

		}else{

			link.hash = hash;
		
			link.save();

			res.redirect("/links/" + link.id );
		};
	});
	
});




var port = 3000;
app.listen(port, function(){
	console.log("port is clean!");
});