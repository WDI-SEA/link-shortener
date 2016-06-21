var express = require('express');
var db = require('./models');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var Hashids = require("hashids")
hashids = new Hashids("this is my salt");

app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render('main/index.ejs');
});


app.get('/:id', function(req, res){
  var decodeId = hashids.decode(req.params.id);
    db.link.find({
    where: { id: decodeId },
    }).then(function(link){
    res.redirect(link.url);
  }).catch(function(error) {
    res.redirect(404).send('Page Not Found');
  });
});

app.use('/links', require('./controllers/link'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
