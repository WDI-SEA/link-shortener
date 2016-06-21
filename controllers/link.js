var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require("hashids")
hashids = new Hashids("this is my salt");

router.post('/', function(req, res){
  db.link.create({
    url: req.body.url
  }).then(function(link){
    var id = hashids.encode(link.id);
    res.redirect('/links/' + id);
  }).catch(function(error) {
    res.status(404).send('Page Not Found');
  });
});

router.get('/:id', function(req, res){
  res.render('links.ejs', {url:'http://localhost:3000/' + req.params.id});

});

module.exports = router;
