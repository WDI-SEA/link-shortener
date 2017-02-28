var express = require('express');
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// app.use(express.static(__dirname, 'public'));

app.get('/', function(req, res) {
  db.link.findAll().then(function(link){
    res.render('index', {link: link});
  });
});

app.get('/links/:id', function(req, res){
  var hash = hashids.encode(parseInt(req.params.id));
  var hashObj = {
    id: hash
  }
  db.link.find({
    where: {
      id: req.params.id
    }
  }).then(function(links){
      res.render('links', {links: links, hashObj: hashObj});
  })

});

app.post('/links', function(req, res){
  db.link.create({
    url: req.body.url
  }).then(function(url){
    res.redirect('./links/' + url.id);
  }).catch(function(err){
    res.send({message: "error", error: err});
  });
});

app.get('/:hash', function(req, res){
  var linkId = hashids.decode(req.params.hash);
  db.link.find({
    where: {id: linkId}
  }).then(function(hash){
    res.redirect("http://" + hash.url);
  })
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
