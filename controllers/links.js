var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");

router.post('/', function(req, res) {
  var urlStart = req.body.urlForm.substring(0, 7);
  if(urlStart === 'http://' || urlStart === 'https:/'){
    db.link.create({
      url: req.body.urlForm
    }).then(function(urlLink){
      
      res.redirect('links/' + urlLink.id);
    });
  } else {
    res.status(500).send('Error! Not a valid url');
  }
});

router.get('/:id', function(req, res){
  db.link.findById(req.params.id).then(function(link){
    var hash = hashids.encode(link.id);
    res.render('hash.ejs', { hash: hash });
  });
});

module.exports = router;