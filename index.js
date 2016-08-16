// REQUIRES
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
// require and create a new Hashids object
var Hashids = require("hashids");

// GLOBAL VARIABLES
var db = require("./models"); // ./ look locally for it
var app = express();

// SETTINGS
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));

// ROUTES
app.get("/", function(req,res){
  res.render('home', {}); 
});

app.get("/show", function(req,res){
  db.link.findAll().then(function(data){
    console.log(data);
    res.render('show', {data: data});
  });
});

app.post('/links', function(req,res){
 console.log(req.body);
 //res.send("links reached");

 db.link.create({
    //linkId: ,
    url: req.body.urlValue
  })
  .then(function(data) {
    res.redirect('show');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });

});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
