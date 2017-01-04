//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var path = require('path');
var moment = require('moment');
//global variables
var app = express();
var db = require("./models");

var Hashids = require("hashids");
var hashids = new Hashids("The 256 -bit naCl for the hash!");

//set /use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(require('morgan')('dev'));
// choose which one to use
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname + '/public/'));
/* middleware that allows us to access the 'moment' library
 * in every single EJS view, without having to define it */
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});
//routes
//Homepage
app.get('/', function(req, res) {
  res.render('home');
});

app.post('/links', function(req, res) {
  db.link.create(req.body).then(function(link) {
    res.redirect('/links/' + link.id);
  });
});
app.get('/links/:id', function(req, res) {
  db.link.find({
      where: {
        id: req.params.id
      },
    })
    .then(function(link) {
      var hash = hashids.encode(link.id);
      console.log("Hash is " + hash);
      res.render('links', {
        hash: hash
      });
    });
});
app.get('/:hash', function(req, res) {
  console.log(req.params.hash);
  var hash = hashids.decode(req.params.hash);
  console.log("decoded has is " + hash);
  db.link.find({
      where: {
        id: hash
      },
    })
    .then(function(link) {
      res.redirect(link.url);
    });
});

// bring in controllers
// app.use('/authors', require('./controllers/name'));
//listen
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
