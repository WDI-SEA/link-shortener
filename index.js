var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('main/index.ejs');

});

app.use('/links', require('./controllers/links'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
