var express = require('express');
var router = express.Router();
var db = require('../models');
var Hashids = require("hashids");
var hashids = new Hashids("da39a3ee5e6b4b0d3255bfef95601890afd80709")

router.post('/', function(req, res) {
  db.link.findOrCreate({
    where: { url: req.body.linky }
  }).spread(function(data, create) {
    var hash = hashids.encode(data.id);

    if (create) {
      // create object if not in database
      res.send("Not in database: " + "noo.li/" + hash)
    }
    else {
      // return object in database
      res.send("Found: " + "noo.li/" + hash);
    }

  });
});

router.get('/:id', function(req, res) {
  console.log("inside");
  res.send(req.params.id);
});

// router.get('/:hash', function(req, res) {
//   // res.redirect('/');
//   res.send(req.params.hash)
// })


module.exports = router;
