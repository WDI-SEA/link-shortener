var express = require("express");
var db = require("../models");
var router = express.Router();

var Hashids = require("hashids");
var hashids = new Hashids("mine is sea salt");
////////////////////////

// Get long URL from user
router.post("/", function (req, res) {
  db.link.create({
    url: req.body.url
  }).then(function(link) {
    var hash = hashids.encode(link.id);
    res.redirect("/links/" + hash);
    // res.send(link);
  }).catch(function(error) {
    res.send("Error at /links");
  });
});

// send url
router.get("/:id", function(req, res) {
  // var linkId = hashids.decode(req.params.id);
  // res.send(req.params.id);
  res.render("show.ejs", { hash: req.params.id });
})


////////////////////////
module.exports = router;
