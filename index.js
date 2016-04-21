var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids("salt is essential");

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));


app.get("/", function(req, res) {
  res.render('index');
});

app.post("/links", function(req, res) {
  console.log(req.body);
  var URL = req.body.url;
  db.link.create({
      url: URL
    }).then(function(link) {
      db.link.find({
        where: {
          url: URL
      }}).then(function(link){
      var secret = link.id;
      var hash = hashids.encode(secret);
        link.hash = hash;
        link.save().then(function(secret){
          res.redirect('/links/'+ secret.id);
        });
    });   
  });
});

app.get("/links", function(req, res) {
  db.link.findAll().then(function(links){
    console.log(links.hash);
    res.render('links', {links:links});
  });
});


app.get("/links/:id", function(req, res) {
  var id = req.params.id;
  db.link.find({where: {id: id}}).then(function(hash){
    res.render('show', {hash:hash});
    });
});

app.get("/:hash", function(req, res) {
  var hash = req.params.hash;
  db.link.find({where: {hash: hash}}).then(function(hash){
  res.redirect(hash.url);
  });
});

app.listen(3000);