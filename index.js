var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));



app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/:hash', function(req, res) {
  var a = hashids.decode(req.params.hash);
  db.link.find({
    where: {id : a}
    }).then(function(link) {
      console.log(link)
    res.redirect(link.url);
  }).catch(function(error) {
    res.status(400).send(error);
  });
});


app.use('/links', require('./controllers/links'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
