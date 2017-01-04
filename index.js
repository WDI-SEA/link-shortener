var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
// require and create a new Hashids object
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');

app.get('/', function(req, res) {
  res.render('index');
});
app.post('/links', function(req, res) {
  db.link.create(req.body).then(function(link) {
    res.redirect('/links/' + link.id);
  });
});

app.get('/links/:id', function(req, res) {
  var id = req.params.id;
  db.link.findById(id).then(function(link) {
    var hash = hashids.encode(link.id);
    res.render('link', { url: link.url, shorturl: 'http://localhost:3000/' + hash });
  });
});

app.get('/:hash', function(req, res) {
  var linkId = parseInt(hashids.decode(req.params.hash), 10);
  db.link.findById(linkId).then(function(link) {
    res.redirect(link.url);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
