var db = require('./models');

db.link.create({
  url: 'yahoo.com'
}).then(function(link){
  console.log(link);
});
