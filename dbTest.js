var db = require('./models');

// db.link.create({
//   url: 'http://www.google.com'
// }).then(function(link) {
//   console.log(link.get());
// });

db.link.find({
  where: { id: 1 }
}).then(function(link) {
  console.log(link);
});
