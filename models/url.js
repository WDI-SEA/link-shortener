var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
	fullurl: String,
	click: Number
});

// urlSchema.methods.sayHello = function() {
// 	return 'Hi ' + this.url;
// }

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;