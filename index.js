var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var hashids = new Hashids("this is my salt", 8);
var db = require('./models');

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.render('main.ejs');
});

app.post('/urlshow', function(req, res) {
  db.link.create({
    url: req.body.url
  }).then(function(url) {
    var id = hashids.encode(url.id);
    console.log(id);
    res.render('urlshow', { link: url, id: id })
  })
})

app.get('/:hash', function(req, res) {
  // db.link
  var id = hashids.decode(req.params.hash);
  db.link.findById(id[0]).then(function(link) {
    console.log(link);
    res.redirect('http://' + link.url);
  })
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
