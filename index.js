var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

// require and create a new Hashids object
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");

// turn a number (such as a model id) to a hash
var hash = hashids.encode(12345); // hash is now "NkK9"


// GET home page      Contains a simple form where a user can enter a URL and get a short URL
app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render('main/index');
});

// POST /links  Create link   Accepts data from the form. Stores the URL in the database and redirects to the show route.
app.post('/links', function(req, res) {
  db.link.create({
    url: req.body.url   // req.body grabs the form data
  })
  .then(function(link) {
    // res.redirect('/links/:id');
    // res.send(link.url);
    var id = hashids.encode(link.id);
    res.redirect('/links/' + id);
  });
});

// GET /links/:id   Show link    Displays the short URL of the specified id (so the user can copy / share it)
app.get('/links/:id', function(req, res) {
  var linkId = hashids.decode(req.params.id);
  db.link.find({
    where: { id: linkId }
  })
  .then(function(link) {
    res.render('main/show', {url:'http://localhost:3000/' + req.params.id});
  });
});

app.get('/:hash', function(req, res) {
  var linkId = hashids.decode(req.params.hash);
  db.link.find({
    where: { id: linkId }
  })
  .then(function(link) {
    res.redirect(link.url);
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
