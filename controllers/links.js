var express = require('express');
var db = require('../models');
var Hashids = require('hashids');
var hashids = new Hashids('dat Kosher goodness sizz-alt');
var router = express.Router();

// Creating entry in db, rendering our /links page
router.post('/', function(req, res) {
  // res.send(req.body);
  db.link.create({
    url: req.body.url
  })
  .then(function(link) {
    var hash = hashids.encode(link.id)
    res.redirect('/links/' + hash);
  })
  .catch(function(error) {
    res.send('Awwww shit, son - we\'ve got an error!');
  });
});

// Routing to our "show link" page
router.get('/:id', function(req, res) {
  res.render('links.ejs', { hash: req.params.id });
});

module.exports = router;
