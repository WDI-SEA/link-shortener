var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('dat Kosher goodness sizz-alt');

var app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Setting up route for our homepage
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// Setting up route for accessing correct url
app.get('/:hash', function(req, res) {
  var linkId = hashids.decode(req.params.hash);
  db.link.find({
    where: { id: linkId }
  })
  .then(function(link) {
    res.redirect(link.url);
  })
  .catch(function(error) {
    res.send('Errors err\'where!');
  });
});

// Requiring controller
app.use('/links', require('./controllers/links'));

// Code ^ above ^ this ^ line, dummie!
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
