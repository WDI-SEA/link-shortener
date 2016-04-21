var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
	fullurl: String,
	clicks: Number
});

// urlSchema.methods.sayHello = function() {
// 	return 'Hi ' + this.url;
// }

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;