var express = require("express");
var app = express();
var path = require("path");
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var db = require("./models");
var Hashids = require("hashids");
var hashids = new Hashids("all these flavors and you choose to be salty");

app.use(require("morgan")("dev"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, "public")));

// GET /
// Home page
// Contains a simple form where a user can enter a URL and get a short URL
app.get("/", function(req, res) {
  res.render("main/index");
});


// POST /links
// Create Link
// Accepts data from the form. Stores the URL in the database and redirects to the show route.
app.post("/links", function(req, res) {
  console.log("CONSOLE:", req.body);
  db.link.findOrCreate({
    // url: req.body.originalURL
    where: { url: req.body.originalURL },
    default: { url: req.body.originalURL }
  }).then(function(link) {
    // console.log("LINK:", link[0].id);
    res.redirect("/links/" + link[0].id);
  });
});

// GET /links/:id
// Show Link
// Displays the short URL of the specified id (so the user can copy / share it)
app.get("/links/:id", function(req, res) {
  db.link.findById(req.params.id).then(function(link) {
    var hash = hashids.encode(link.id);
    res.render("main/show", { hash: hash });
  });
});

// GET /:hash
// Redirect
// Takes the hash and redirects the user to the URL stored in the database.
app.get("/:hash", function(req, res) {
  var linkId = hashids.decode(req.params.hash);
  console.log("ID:", linkId[0]);
  db.link.findById(linkId[0]).then(function(link) {
    res.redirect(link.url);
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
