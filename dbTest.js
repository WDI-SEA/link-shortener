var db = require('./models');
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");



db.link.create({
  url: 'www.google.com'
}).then(function(link) {
  var hash = hashids.encode(link.id)
  // link.url
  console.log(hash);
});


