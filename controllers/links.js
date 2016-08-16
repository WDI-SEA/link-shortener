//Requirements
var express = require("express");
var db = require("../models");
var router = express.Router();
var Hashids = require("hashids");
var hashids = new Hashids("himalayan pink salt");

//Routes

//Requirement 2: POST /links Accepts data from the form. Stores the URL in the database and redirects to the show route.

router.post('/', function(req, res){
  db.link.create({
    url: req.body.url
  }).then(function(link){
    var hash = hashids.encode(link.id);
    res.redirect('/links/' + hash);
  }).catch(function(error) {
    res.send('Ut oh: Error at /links');
  });

});

//REQUIREMENT 3: GET /links/:id Displays the short URL of the specified id

router.get('/:id', function(req, res){
  res.render('show.ejs', {hash: req.params.id});
});

module.exports = router;

