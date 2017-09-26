var express = require('express');
var db = require('./models');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require('hashids');
var hashids = new Hashids("this is my salt");
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

//renders homepage
app.get('/', function(req, res) {
    res.render('index');
});

//grabs info from input on form to add to database
app.post('/link', function(req,res){
  db.link.findOrCreate({
    where: {url: req.body.url},
  }).spread(function(newUrl, wasCreated){
    res.redirect('link/' + newUrl.id);
  });
});

//gets a page with list of all links in database
app.get('/link', function(req,res){
  db.link.findAll({order: 'id DESC'}).then(function(result){
    result.forEach(function(link){
        link.hash = hashids.encode(parseInt(link.id));
    });
     res.render('link', {links: result});
  });
});

//show individual page(hash.ejs) for each link in database
app.get('/link/:id', function(req, res){
  var hash = hashids.encode(parseInt(req.params.id));
  res.render('hash', {hash: hash});
});

//this redirects to hash page aka original page
app.get('/:hash', function(req, res){
  var linkId = parseInt(hashids.decode(req.params.hash));
  db.link.findById(linkId).then(function(result) {
    res.redirect(result.url);
   });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
