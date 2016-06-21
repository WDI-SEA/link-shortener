var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids('salt');

router.post('/', function(req, res) {
  // res.send(req.body.linktoshorten);
  // db.link.create({
  //   url: req.body.linktoshorten
  // }).then(function(link) {
  //   console.log(link.get());
  // })
  db.link.findOrCreate({
  where: {
    url: req.body.linktoshorten
  }
}).spread(function(data, create) {
  var hash = hashids.encode(data.id);

  if(create) {
      res.send('Not in the DB ' + 'localhost:3000/' + hash);
  }else {
  res.send('Found in the DB: ' + 'localhost:3000/' + hash); // returns info about the user
  }
});

});


module.exports = router;
