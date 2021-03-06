
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , redis = require('redis');

var app =  exports.app = express()
	, server = http.createServer(app)
	, client = redis.createClient()
	, chat	 = require('./lib/chat');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(chat);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

exports.server = server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/sockets')(app, exports.server);
