var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var Hashids = require("hashids"),
  hashids = new Hashids("this is my salt");

var db = require("./models");
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/links', function(req, res){
  var inputUrl = req.body.url;
  db.link.create({url: inputUrl}).then(function(data){
    var hash = hashids.encode(data.id);
    data.updateAttributes({hash: hash});
    res.redirect('/links/' + data.id);
  });
});

app.get('/links', function(req, res){
  db.link.findAll().then(function(links){
   res.render('links',{links: links});
  });
});

app.get('/links/:id', function(req, res){
  db.link.findById(req.params.id).then(function(data){
    var outputUrl = data.url;
    var hash = data.hash;
    res.render('show', {url: outputUrl, hash: hash});
  });
});

app.get('/:hash', function(req, res){
    var hash = req.params.hash;
    var id = hashids.decode(hash);
    console.log("id before " + id);
    id = id[0];
    console.log("id after " + id);
    db.link.findById(id).then(function(data){
      res.redirect(data.url);
    })

})

app.listen(3000);