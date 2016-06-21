var db = require('./models');

// db.link.create({
//   url: 'google.com/'
// }).then(function(event) {
//   console.log(event.get());
// });

// db.link.find({
//   where: { id: 1 },
// }).then(function(event) {
//   console.log(event);
// });

db.link.update({
  clicks: 1
}, {
  where: { id: 1 },
})
