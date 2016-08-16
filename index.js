//Dependencies
var express = require('express');
var bodyParser = require("body-parser");


var app = express();

app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));


////ROUTES
app.get('/', function(req, res) {
  ///simpe form for entering a url and getting a shortened one
  res.render('index');
});

app.post('/links', function(req, res){
  //accept data from home page for, stores URL in database and redirects to show route
});

app.get('/links/:id', function(req, res){
  //displays the short URL of the specified id
});

app.get("/:hash", function(req, res){
  //takes the hash and redirects the user to the URL stored in the database
});

////LISTEN
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
