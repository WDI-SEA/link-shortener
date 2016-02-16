var express = require('express');
var router = express.Router();
var db = require('../models');
var Hashids = require('hashids'),
  hashids = new Hashids("I'm a salty sponge!", 8);

router.post('/', function(req, res) {
  var q = req.body.url;
  db.tinyurl.create({
    url: req.body.url,
    clicks: 0
  }).then(function(tinyurl) {
    var myHash = hashids.encode(tinyurl.id);
    tinyurl.updateAttributes({
      hash: myHash
    });
    res.render('linksFolder/links', {tinyurl: tinyurl});
  });
});

router.get('/list', function(req, res) {
  db.tinyurl.findAll({
    order:'clicks DESC'
  }).then(function(tinyurls) {
    res.render('linksFolder/linkList', {
      tinyurls: tinyurls
    });
  });
});

router.get('/:hash', function(req, res) {
  db.tinyurl.findOne({ where: { hash: req.params.hash} }).then(function(tinyurl) {
    res.redirect(tinyurl.url);
    tinyurl.clicks++;
    tinyurl.save();
  });
});

module.exports = router;