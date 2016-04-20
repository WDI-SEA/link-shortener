var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));


app.get("/", function(req, res) {
  res.render('index');
});

app.post("/links", function(req, res) {
  var comment = {imdbId: req.body.imdbID, 
                  title: req.body.title, 
                  year: req.body.year};

  db.favorite.create(favMovie).then(function(movie){
    console.log(movie);
    res.redirect('/favs');
  });
});

app.get("/links/:id", function(req, res) {
  var linkId = req.params.id;
  res.render('show');
});

app.get("/:hash", function(req, res) {
  res.render('hash');
});

app.listen(3000);