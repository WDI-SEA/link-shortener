var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');

var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/links', function(req, res){
  db.link.create(req.body).then(function(link){
    res.redirect('/links' + link.id);
  });
});

app.get('/link/:id', function(req, res){
  db.link.find({
    where: {
      id: req.params.id
    }
  }).then(function(link){
    var hash =hashids.encode(link.id);
    res.render('links', {
      hash: hash
    });
  });
});

app.get('/:hash', function(req, res){
  var hash = hashids.decode(req.params.hash);
  db.link.find({
    where: {
      id: hash
    }
  }).then(function(link){
    res.redirect(link.url);
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
