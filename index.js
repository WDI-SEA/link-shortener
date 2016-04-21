var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var flash = require
var db = require('./models');


var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/static'));



app.get('/', function(req, res) {
  res.render('index');
});

app.post('/link', function(req, res) {
  db.findOrCreate({where})
});









var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});




