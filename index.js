var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models')
var ejsLayouts = require('express-ejs-layouts')
var router = express.Router();
var Hashids = require('hashids');

var hashids = new Hashids("Hash", 6);

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static/'));

app.get('/', function(req, res){
	res.render('index.ejs');
})

app.post('/', function(req, res){
	var link = req.body.url;
	db.hash.findOrCreate({
		where: 
		{url: link}
	}).spread(function(newRow, isNew){
		newRow.hash = hashids.encode(newRow.id);
		newRow.clickCount = 0;
		newRow.save();
		res.redirect('/link/' + newRow.id);
	})
})

app.get('/link/:id', function(req, res){
	console.log(req.params.id);
	db.hash.findById(req.params.id).then(function(link){
		if(link){
			res.render('link', {row : link})
		}
	})
})

app.get('/links', function(req, res){
	db.hash.findAll({order: '"clickCount" DESC'}).then(function(links){
		if(links){
			res.render('links.ejs', {links : links});
		}else{
			res.send('error, ya fuck');
		}
	}).catch(function(err){
		res.send('fucking error man');
	})
})

app.get('/:hash', function(req, res){
	var hashid = req.params.hash;
		db.hash.findOne({where: {hash: hashid}
		}).then(function(row){
		if(row){
			if(!row.url.includes("http://")){
				row.url = "http://" + row.url;
				console.log(row.url);
			}
			row.clickCount += 1;
			row.save();
			res.redirect(row.url)
		}else{
			res.send("Error, you monkey!");
		}

	});
});




module.exports = router;

app.listen(3000);