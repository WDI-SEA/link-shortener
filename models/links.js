var mongoose = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
  id: String,
  url: String,
  hash: String
  });

var Url = mongoose.model('Url', userSchema);

module.exports = Url;
