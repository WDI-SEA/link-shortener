var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");
var Hashids = require("hashids");
var hashids = new Hashids("mine is sea salt");

app.set("view engine", "ejs");

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));


app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render("main.ejs");
});

app.get("/:hash", function(req, res) {
  var linkId = hashids.decode(req.params.hash);
  db.link.find({
    where: { id: linkId }
  }).then(function(link) {
    // res.send(link);
    res.redirect(link.url);
  }).catch(function(error) {
    res.send("error");
  });
});

// add controllers
app.use("/links", require("./controllers/links"));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
