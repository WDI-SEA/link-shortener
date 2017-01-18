var db = require('./models');

db.link.create({
  url: 'google.com'
}).then(function(link){
  console.log(link);
});
