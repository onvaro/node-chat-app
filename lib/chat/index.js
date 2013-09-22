var express =  require('express')
	, app			= module.exports = express()
	, clients = {};


app.get('/', function (req, res) {
	  res.render('index', { title: 'Express' });
});