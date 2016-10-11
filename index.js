var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var moment = require('moment');
var app = express();
var Hashids = require("hashids");
var hashids = new Hashids("my super secret salt vault");


app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('show');
});

//Post the submitted URL
app.post('/links', function(req, res){
  // console.log(req.body);
  // res.send("success");
  db.link.create({
    url: req.body.url
  }).then(function(link){
    console.log(link)
    res.redirect('/links/' + link.id);
  });
});

//Get to display the shortened link
app.get('/links/:id', function(req, res){
  db.link.findOne({
    where: {id: req.params.id}
  }).then(function(link){
  var hash = hashids.encode(link.id);
  res.render('short', { link: link, hash: hash });
  });
});

// Redirect the user to the URL stored in database
app.get('/:hash', function(req, res){
  var linkId = hashids.decode(req.params.hash);
  console.log(linkId);
  db.link.findOne({
    where: {id: linkId[0]}
  }).then(function(link){
  console.log(link);
  res.redirect(link.url);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
