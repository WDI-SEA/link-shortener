var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

// db + hashid declaration
var Hashids = require("hashids");
var hashids = new Hashids("da39a3ee5e6b4b0d3255bfef95601890afd80709");
var db = require('./models');


app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.render('form');
});

app.get('/:hash', function(req, res) {
  // decrypt
  var linkId = hashids.decode(req.params.hash);

  // find
  db.link.find({
    where: { id: linkId }
  }).then(function(event) {
    // redirect
    var url = event.url
    event.clicks += 1;
    console.log(event);
    // Checks if the url has the http prefix on it. Without this prefix,
    // res.redirect assumes this is a relative path.
    if (url.split(':')[0] !== 'http' || url.split(':')[0] !== 'https') {
      res.redirect('http://' + url);
    } else {
      res.redirect(url);
    }

  });


})

app.use('/links', require('./controllers/links.js'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
