var db = require('./models');

db.link.create({
  url: "http://www.testingmydatabase.com"
}).then(function(comment) {
  console.log("woopie!");
});

// db.link.find({
//   where: { id: 1 },
//   include: [db.comment]
// }).then(function(post) {
//   // by using eager loading, the post model should have a comments key
//   console.log(post);
// });
