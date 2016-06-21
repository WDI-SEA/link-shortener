var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var Hashids = require("hashids");
var hashids = new Hashids("Salt and Vinegar");

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

app.use('/links', require('./controllers/links'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/:hash', function(req,res) {
  // Why did favicon request hit this route?
  if(req.url === '/favicon.ico') {
    return;
  }
  var hashParam = req.params.hash;
  var decodedHash = hashids.decode(hashParam);
  db.link.findById(decodedHash[0]).then(function(hash) {
    res.redirect(hash.url);
  });
});



var server = app.listen(process.env.PORT || 3000);

module.exports = server;
