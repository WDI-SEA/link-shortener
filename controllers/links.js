var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require("hashids");
var hashids = new Hashids("Salt and Vinegar");

router.post('/', function(req,res) {
  // Old check for valid URL
  // var urlStart = req.body.urlForm.substring(0,7);
  // if(urlStart === 'http://' || urlStart === 'https:/') {
  //   db.link.create({
  //     url: req.body.urlForm
  //   }).then(function(urlLink) {
  //     res.redirect('/links/' + urlLink.id);
  //   });
  // } else {
  //   res.status(500).send('Error! Not a valid URL');
  // }

  db.link.create({
    url: req.body.urlForm
  }).then(function(urlLink) {
    res.redirect('/links/' + urlLink.id);
  });
});

router.get('/:id', function(req,res) {
  db.link.findById(req.params.id).then(function(link) {
    var linkId = link.id;
    var id = hashids.encode(linkId);
    res.render('hash.ejs', { hash: id });
  });

});

// router.get('/:hash', function(req,res) {
//   res.send(req.params.hash);
// });

module.exports = router;
