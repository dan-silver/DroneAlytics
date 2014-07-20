/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var face = require('./face++');
var drone = require('./drone.js');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);



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


var faces = ["hello","there","bro"];
/*
a=true
drone.startPNGStream(function(fileName) {
  if (a==true) {
    a=false
    console.log("received image from startPNGStream - " + fileName)
    face.faceFind(fileName, function(results) {
      console.log("now update UI")
      console.log("result=",results)
      for(i=0;i<results.face.length;i++){
      	faces.push(face[i]);
      }
    })
  }
})
*/

app.get('/',function(req, res){
	res.render('index');
});


io.sockets.on('connection', function(socket){
	socket.emit('init faces',faces);

	setInterval(function(){
		faces.push("hey bro");
		socket.emit('add faces', faces[faces.length-1]);
	},1000);
});






// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



