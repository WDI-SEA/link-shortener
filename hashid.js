//example from class

var Hashids = require('hashids');
var hashids = new Hashids('salty random string');

var newHash = hashids.encode(1234);

console.log(newHash);
console.log(hashids.decode(newHash));