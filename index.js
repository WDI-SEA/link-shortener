//Requirements
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

//Global variables
//look locally for models folder(./)
var db = require('./models');
var app = express();
var Hashids = require('hashids');
var hashids = new Hashids('himalayan sea salt');

//Settings
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public/"));

//Routes

//X Requirement 1: Get / Contains a simple form where a user can enter a URL and get a short URL
app.get('/', function(req, res) {
  res.render('home.ejs');
});

//Requirement 4: GET /:hash Take hash and redirects user to URL stored in db
app.get("/:hash", function(req, res) {
  var linkId = hashids.decode(req.params.hash);
  db.link.find({
    where: { id: linkId }
  }).then(function(link) {

      res.redirect(link.url);

  }).catch(function(error) {
    res.send("error");
  });
}); // end get(":hash")

//Controllers

app.use("/links", require("./controllers/links"));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
