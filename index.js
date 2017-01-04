//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app variables
var app = express();
var db = require("./models");
var path = require('path');

var Hashids = require("hashids");
var hashids = new Hashids("The 256-bit NaCl for the hash!");

//setup/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'static')));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/links', function(req, res){
  db.link.create(req.body).then(function(link){
    res.redirect('/links/' + link.id);
  });
});

app.get('/links/:id', function(req,res){
  db.link.find({
    where: {id: req.params.id},
  })
  .then(function(link){
    var hash = hashids.encode(link.id);
    console.log("Hash is "+hash);
    res.render('links', {hash:hash});
  });
});

app.get('/:hash', function(req,res){
  console.log(req.params.hash);
  var hash = hashids.decode(req.params.hash);
  console.log("decoded has is "+hash);
  db.link.find({
    where: {id: hash},
  })
  .then(function(link){
    res.redirect(link.url);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
