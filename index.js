var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Hashids = require("hashids")



var Url = require('./models/url.js')
var app = express();


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

mongoose.connect('mongodb://localhost/link-shortener');

var hashids = new HashIds("eargahqrtwtydfgzs");




app.get('/', function(req,res) {
  res.render('index'), {requested: false, fullurl: '', shorturl: ''});
});





app.post('/urls', function(req,res) {
  Url.count({fullurl: req.body.url}, function(error,count){
    if(!error && count===0) {
      var item = new Url({fullurl: req.body.url, click: 0});
      item.save(function(error, urls) {
        var shorturl = req.headers.host + "/" + hashids.encodeHex(doc._id);
        res.render('index', {requested: true, fullurl: req.body.url, shorturl: shorturl});
      });
} else if (!error && count === 1)
  



  db.findOrCreate({where: {
    url: req.body.url
  }}).spread(function(url, isNew) {
    if(isNew) {
      res.redirect('/linksShow');
    } else {
      res.redirect('/');
    }
  }).catch(function(err) {
    res.send(err);
  })
});

app.get('/links/:id', function(req,res) {
  res.render('/linksShow', {links: links});
});

app.get('/links/:hash', function(req,res) {

});

var port = 3000;
app.listen(port,function() {
  console.log('we are live.')
});