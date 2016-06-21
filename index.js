var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");



app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(require('morgan')('dev'));



app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render('main/index');
});

app.post('/posts', function(req, res) {
  //res.send(req.body.url)
  db.link.create({
    url: req.body.url
  }).then(function(event) {
    var hashids = hashids.encode("linkId")
    var linkId = hashids.decode("hashids")


    // feed event.id into hashid function.
    // then res.send('localhost:3000/' + hashid);
    // event.id
  })
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
