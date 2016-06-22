var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

var Hashids = require('hashids');
var hashids = new Hashids('salt');

var app = express();

app.use(express.static('public'));
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// paths

app.get('/', function(req, res) {
  res.render('form.ejs');
});

app.get('/:hash', function(req, res) {
  // res.send(req.body.params) to test if stuff is working
  var linkId = hashids.decode(req.params.hash);

  db.link.find({
    where: { id: linkId }
  }).then(function(link) {
    link.clickCount++;
    link.save().then(function() {
      res.redirect(link.url);
    });
  });
});

// controller path

app.use('/link', require('./controllers/link.js'));
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
