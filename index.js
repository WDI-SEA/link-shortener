var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);



app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/:hash', function(req, res){
  var urlDecoded = hashids.decode(req.params.hash);
  db.link.findById(urlDecoded[0]).then(function(newUrl){
    res.redirect(newUrl.url);
  });
});

app.use('/links', require('./controllers/links.js'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
