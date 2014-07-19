/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var face = require('./face++.js');
var drone = require('./drone.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

drone.startPNGStream()

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Face++ API
var API_KEY = "9d6a99bbb5fe5a0b10d59dc10dbf7b16";
var API_SECRET = "xuv78oYAF - TgYy - tEtjWXIiKtFwlQIrc";


face.face();

/*
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
  face.face(API_SECRET,API_KEY);
=======
app.get('/', function(req, res) {
  res.render('index', {
      title: 'Express'
  });
  face.face();
>>>>>>> 20b726e695f09a6be964d6f5340c6e755c2a8f11
});
*/


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
