var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');


app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get('/',function(req, res) {
  res.send("hey");
})



var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});
