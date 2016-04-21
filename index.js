var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
	res.send("Well hello there");
});


var port = 3000;
app.listen(port, function() {
	console.log('Welcome welcome, you\'re far to find. Welcome to the port of ' + port);
});