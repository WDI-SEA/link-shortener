var db = require('./models');
var Hashids = require("hashids")

hashids = new Hashids("this is my salt");

var id = hashids.encode(Math.floor((Math.random() * 10) + 112342));
console.log(id);
