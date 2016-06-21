var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require('body-parser');
var Hashids = require("hashids");
var db = require('./models');

var hashids = new Hashids("this is my salt");

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('main');
})

app.post('/urlShow', function(req, res) {
  db.link.create({
    url: req.body.url
  }).then(function(url) {
    var id = hashids.encode(url.id);
    res.render('urlShow', { link: url, link2: id });
  })
})

app.get('/:hash', function(req, res) {
    console.log('*****', req.params.hash);
    var idHash = hashids.decode(req.params.hash);
    console.log('*********', idHash);
    db.link.findById(idHash).then(function(link) {
   // res.redirect();
  })

});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;


