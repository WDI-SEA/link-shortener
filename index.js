var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids');
var app = express();

hashids = new Hashids('this is my salt');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/show', function(req, res) {
  // var links = myURLs
  db.links.find
  res.render('show', {links: myURLs});
});

app.post('/show', function(req, res) {
  var textInput = req.body.inputLink;


  db.links.create({
    url: textInput,
    count: 0
  }).then(function(data) {
    var hash = hashids.encode(data.id);

    data.updateAttributes({
      hash: hash
    });
    res.redirect('/show/' + (data.id));
  });
});

app.get('/show/:id', function(req, res) {
  var id = req.params.id;
  db.links.findById(id).then(function(data) {
    var url = data.url;
    var hash = data.hash;
    res.render('id', {url: url, hash: hash});
  });
});

app.get('/:hash', function(req, res) {
  var hash = req.params.hash;
  var id = hashids.decode(hash);
  id = id[0];
  db.links.findById(id).then(function(data) {
    var url = data.url;
    res.redirect('http://' + url);
  });
});

app.listen(3000, function() {
  console.log('starting');
});