var express = require('express');
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var Hashids = require('hashids');

var db = require("./models");
var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

var hashids = new Hashids('dont let your memes be dreams', 5);
 
//console.log(hashids.encode(1));

app.use(require('morgan')('dev'));


app.get('/', function(req, res) {
  //res.send('Hello Backend!');
  res.render('index');

});

app.post('/links', function(req, res){
  //console.log(req.body);
  db.link.create(req.body).then(function(link){
    res.redirect('/links/' + link.id);
  });
});

app.get('/links/:id',function(req, res){
  //console.log(req.params.id);
  db.link.findById(req.params.id).then(function(url){
    hash = hashids.encode(req.params.id);
    //console.log(hash);
    res.render('show', {hash: hash});
  });
});

app.get("/:hash", function(req, res){
  var linkID = hashids.decode(req.params.hash);
  db.link.findOne({ where: {id: linkID} }).then(function(url){
    console.log(url.url);
    res.redirect(url.url);
  });
  
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
