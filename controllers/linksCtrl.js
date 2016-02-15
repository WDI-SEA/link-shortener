var express = require('express');
var router = express.Router();
var db = require('../models');
var Hashids = require('hashids'),
  hashids = new Hashids("I'm a salty sponge!", 8);

router.post('/', function(req, res) {
  var q = req.body.url;
    db.tinyurl.create({
      url: req.body.url,
      hash: hashids.encode(db.tinyurl.find({ where: { url: q }}).then(function(tinyurl) {
        return tinyurl.id;}))
    });
	res.render('linksFolder/links');
});


router.get('/', function(req, res) {
  var userInput = req.params.userInput;
  console.log('action two ') +userInput;
  res.render('linksFolder/links');

}) 

router.get('/list', function(req, res) {
  db.tinyurl.findAll().then(function(tinyurls) {
    res.render('linksFolder/linkList', {
      tinyurls: tinyurls
    });
  });
});

router.get('/:hash', function(req, res) {

});

module.exports = router;