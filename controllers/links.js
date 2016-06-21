var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids('this is my salt');

router.post('/', function(req, res) {
  db.link.create({
    url: req.body.url
  }).then(function(post) {
    var hash = hashids.encode(post.id);
    res.redirect('/links/' + hash);
  }).catch(function(error) {
    res.status(400).send(error);
  });
});

router.get('/:id', function(req, res) {
  res.render('link.ejs', {hash: req.params.id});
});

module.exports = router;
