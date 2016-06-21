var express = require('express');
var router = express.Router();
var db = require('../models');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require("hashids");
var hashids = new Hashids("da39a3ee5e6b4b0d3255bfef95601890afd80709")

router.post('/', function(req, res) {
  db.link.findOrCreate({
    where: { url: req.body.linky }
  }).spread(function(data, create) {
    var hash = hashids.encode(data.id);

    if (create) {
      // create object if not in database
      res.send("Not in database: " + process.env.LINK_SHORTENER_URL + '/' + hash)
    }
    else {
      // return object in database
      res.send("Found: " + process.env.LINK_SHORTENER_URL + '/' + hash);
    }

  });
});


router.get('/stats', function(req, res) {

  db.link.findAll({
    order: 'clicks DESC',
    limit: 10
  }).then(function(event) {
    res.render('stats', { links: event, hash: hashids });
  })

})

module.exports = router;
