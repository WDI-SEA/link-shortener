var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var request = require('request');


app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get('/',function(req, res) {
  res.render("index");
})

app.get('/links/:id',function(req, res ) {
  res.render('links.ejs');
})

app.get('/links/:hash',function(req, res ) {
  res.render('links.ejs');
})

app.post('/links', function(req,res) {

})

var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});
