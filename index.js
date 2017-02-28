var express = require('express');
var db = require('./models');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var hashids = new Hashids("this is my salt");
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  //create form where user enters URL
  res.render('index');
});

app.get('/links', function(req,res) {
  db.link.findAll({order: 'count DESC'}).then(function(result){
    result.forEach(function(link){
      link.hash = hashids.encode(parseInt(link.id));
    });
    res.render('links', {links: result});
  });
});

app.get('/links/:id', function(req, res){
  //display short url of id so user can copy/share it
  var hash = hashids.encode(parseInt(req.params.id));
  res.render('hash', {hash: hash});
});

app.get('/:hash', function(req, res){
  //get hash and redirect user to url stored in db
  var linkId = hashids.decode(req.params.hash);

  db.link.findById(parseInt(linkId)).then(function(result) {
    return result.increment('count', {by: 1})
  }).then(function(updatedResult){
    res.redirect(updatedResult.url);
  });
})

app.post('/links', function(req, res){
  //accept data from form
  //store URL in database
  db.link.findOrCreate({
    where: {url: req.body.url},
    defaults: {count: 0}
  }).spread(function(newUrl, wasCreated){
    res.redirect('links/' + newUrl.id);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
