//Test comment posting
var db = require('./models');

db.link.create({
  id: 1,
  url: 'http://www.google.com'
}).then(function(url) {
  console.log(url.get());
})
