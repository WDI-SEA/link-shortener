var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var Hashids = require('hashids');
var hashids = new Hashids('HelloWorld!');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

// GET - home page w/ form to enter long URL
app.get('/', function(req, res) {
  res.render('index');
});

// POST - accepts form data and stores long URL then redirecrts to show URL
app.post('/links', function(req,res){
  // where for finding and will contribute to create if needed
  // defaults for creating if not supplied
  // spread is the promise instead of then
  db.link.findOrCreate({
    where: {url: req.body.longUrl},
    defaults: {count: '0'}
  }).spread(function(link){
    console.log(link);
    var id = link.id;
    res.redirect('/links/'+id);
  });
});

// GET - show short URL for specified id
app.get('/links/:id', function(req,res){
  var id = req.params.id;
  var hash = hashids.encode(id);
  res.render('show',{hash:hash});
});

// GET - takes hash and redirects the user to the URL stored in the databse
app.get('/:hash',function(req,res){
  var hash = req.params.hash;
  console.log('hash: '+hash);
  var id = parseInt(hashids.decode(hash),10);
  console.log('id: '+id);

  db.link.findById(id).then(function(link){
    if(link.count>0){
      link.count++;
      console.log('count more than 0: '+link.count);
      link.save().then(function(){
        // used for the stats
        //res.render('outbound',{link: link});

        // used for redirection
        res.redirect(link.url);
      });
    } else{
      link.count = 1;
      console.log('count more than 0: '+link.count);
      link.save().then(function(){
        // used for the stats
        //res.render('outbound',{link: link});

        // used for redirection
        res.redirect(link.url);
      });
    }
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
