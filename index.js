//Requires
var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require('hashids');

//Global Variables
var app = express();
var db = require("./models");
var hashids = new Hashids("this is my salty");

//Settings
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/links', function(req, res){
  db.link.create({
    url: req.body.textInput
  }).then(function(link){
    res.redirect('/links/' + link.id);
  });
});

app.get('/links/:id', function(req, res){
  db.link.findOne({where: {id: req.params.id}}).then(function(link){
    var hash = hashids.encode(link.id);
    res.render('show', {link: link, hash: hash});
  });
});

app.get('/:hash', function(req, res){
  var unlock = hashids.decode(req.params.hash);
  console.log('unlock - ', unlock);
  console.log('# ', req.params.hash);
  db.link.findOne({where: {id: unlock[0]}}).then(function(link, err){
    console.log(link);
    console.log(err)
    res.redirect(link.dataValues.url);
  });
});

//Listen
var server = app.listen(process.env.PORT || 3000);

//Exports
module.exports = server;
