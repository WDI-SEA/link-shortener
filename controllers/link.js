var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids('salt');

router.post('/', function(req, res) {
  db.link.create({
    url: req.body.linktoshorten
  }).then(function(data) {
    var hash = hashids.encode(data.id);
    res.render('shorted.ejs', { hash: hash });
  });
});


module.exports = router;
