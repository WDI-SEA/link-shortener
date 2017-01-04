//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var path = require('path');
var moment = require('moment');
//global variables
var app = express();
var db = require("./models");
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
  res.send('Hello Backend!');
});
// gets all articles  db. is based on folder models name
//get single article by ID
//get new article form
// create a new article



// bring in controllers
app.use('/authors', require('./controllers/authors'));
//listen
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
