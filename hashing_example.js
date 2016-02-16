example in terminal dont forget to install hashids.

var Hashids = require('Hashids');
var hashids = new hashids('my salt');

var newHash = hashids.encode(12345);

console.log(newHash);
console.log(hashids.decode(newHash));

// localhost:3000/m9

// app.get('/:hash')
// req.params.hash