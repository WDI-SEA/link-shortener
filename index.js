var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var Hashids = require('hashids');
var db = require('./models')

var app = express();
var hashids = Hashids('montehooversalt');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.use(session({
  secret: 'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

var newUrl = 'ow.ly/1et13';

app.use('/tweets', require('./controllers/tweet.js'));

// Both the home page and the show route
app.get('/', function(req, res) {
  res.render('index', {url: newUrl});
});

app.post('/', function(req, res) {
  res.send(req.body);
  hashedUrl = hashids.encode(req.body.fullUrl)
  db.link.create({url: hashedUrl})
});

app.get('/:hash', function(req, res) {
  var url = hashids.decode(req.params.hash)
  db.findOne(:)
});

app.get('/auth/signup', function(req, res) {
  res.render('signup', {alerts: req.flash()});
});

app.post('/auth/signup', function(req, res) {
  // console.log(req.body);
  db.user.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: {
      password: req.body.password
    }
  }).spread(function(user, isNew) {
    if (isNew) {
      console.log(user);
      res.redirect('/');
    } else {
      req.flash('danger', 'Username already taken');
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    res.send(err);
  });
});

app.get('/tweet')

var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});