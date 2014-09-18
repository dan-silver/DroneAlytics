/**
 * Module dependencies.
 */

var express = require('express'),
	 routes = require('./routes'),
	   user = require('./routes/user'),
	   http = require('http'),
	   path = require('path'),
	   face = require('./face++'),
	  drone = require('./drone.js'),
        app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var faces = []
var actual_faces = []

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

var processImage = function(imgBuffer, error, rawData, results) {
	if (results != null) {
		console.log("faces: ", results.face.length)
		for (var i=0;i<results.face.length;i++) {
			faces.push(results.face[i])
      io.sockets.emit('actual_face', imgBuffer.toString('base64'));
      actual_faces.push(imgBuffer.toString('base64'))
    }
  }
    io.sockets.emit('init faces', results.face);
}

drone.startPNGStream(function(imgBuffer) {
  console.log('emiting image')
  io.sockets.emit('image', imgBuffer.toString('base64'))
  face.faceFind(imgBuffer, processImage)
})

var checkForSuccesses = function(imgBuffer) {
  conole.log(imgBuffer)
}

app.get('/',function(req, res){
  res.render('index');
});

io.sockets.on('connection', function(socket) {
  socket.emit('init faces',faces);
  for (i=0;i<actual_faces.length;i++) {
    socket.emit('actual_face',actual_faces[i]);
  }
});

// setInterval(function() {
//   samples = ["sample.jpg","sample_2.jpg","sample_3.jpg"]
//   face.faceFind(samples[Math.floor(Math.random()*samples.length)], processImage)
// },1000)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});