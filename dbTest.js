var db = require('./models');

db.link.create({
  url: 'http://www.google.com'
}).then(function(link) {
  console.log(link.get());
});