var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var mongoose = require('mongoose');

var Url = require('./models/links');
//Hash
var Hashids = require("hashids"),
  hashids = new Hashids("this is my salt");

app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );


mongoose.connect('mongodb://localhost/link-shortener');


//

app.get('/',function(req, res) {
  res.render("index");
})

app.get('/links/:id',function(req, res ) {
  var id = req.params.id;
  console.log(id);
  res.render('links.ejs',{id:id});
})

app.get('/links',function(req, res ) {
  var id = req.params.id;
  console.log(id);
  res.render('links.ejs',{id:id});
})

app.get('/links/:hash',function(req, res ) {
  res.render('links.ejs');
})

app.post('/links', function(req,res) {
  formSubmit = req.body;
  Url.create({url:formSubmit.url});

})



var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});
