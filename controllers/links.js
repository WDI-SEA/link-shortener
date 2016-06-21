var express = require("express");
var db = require("../models");
var router = express.Router();

var Hashids = require("hashids");
var hashids = new Hashids("mine is sea salt");
////////////////////////

// Get long URL from user
router.post("/", function (req, res) {
  db.link.find({
    url: req.body.url
  }).then(function(link) {
    var hash = hashids.encode(link.id);
    res.redirect("/links/" + hash);
    // res.send(link);
  }).catch(function(error) {
    res.send("Error at /links");
  });
});

// List Data
router.get("/list", function(req, res) {
  db.link.findAll({
    order: 'count ASC',
    limit: 10
  }).then(function(list) {
    // res.send(list);
    res.render("list.ejs", { list: list });
  })
});

// Send url
router.get("/:id", function(req, res) {
  // var linkId = hashids.decode(req.params.id);
  // res.send(req.params.id);
  res.render("show.ejs", { hash: req.params.id });
})



////////////////////////
module.exports = router;
