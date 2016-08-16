var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');

// POST /links - create a new link
router.post('/', function(req, res) {
  db.link.create({
    url: req.body.url
  })
  .then(function(link) {
    console.log(link)
    res.redirect('/links/'+link.dataValues.id );
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// // GET - shrink the link
// router.get('/:id', function(req, res) {

// })


// GET /links/:id - display the shortened link
router.get('/:id', function(req, res) {
  db.link.find({
    where: { id: req.params.id }
  })
  .then(function(link) {
    if (!link) throw Error();
    res.render('links/show', { link: link });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});


module.exports = router;
