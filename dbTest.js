var db = require('./models');

db.link.create({
  url: 'http://www.reddit.com'
})
.then(function(link) {
  console.log(link.get());
});
