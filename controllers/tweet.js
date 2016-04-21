var express = require('express');
var db = require('../models');
var router = express.Router()

var fakeTweets = [
    {username: 'spock', content: 'live long and prosper'},
    {username: 'worf', content: 'FIRE!'},
    {username: 'picard', content: 'engage'},
    {username: 'picard', content: 'make it so'},
];

router.get('/', function(req, res) {
  
  db.tweet.findAll({
    include: [db.user]
  }).then(function(tweets){
    res.render('tweets', {tweets: tweets});  
  })
});

router.get('/new', function(req, res) {
  res.render('post-tweet');
});

router.post('/', function(req, res) {
  console.log(req.body);
  // fakeTweets.push(req.body);
  db.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    user.createTweet({
      content: req.body.content
    }).then(function(tweet) {
      res.redirect('tweets');
    });
  });


  // res.send(req.body);
});

module.exports = router;