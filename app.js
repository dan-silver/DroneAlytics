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

// drone.startPNGStream(function(fileName) {
//   face.faceFind(fileName, processImage)
// })

var processImage = function(results) {
	if (results != null && results.face != null) {
		// console.log("results ARRAY", results.face)
		for (var i=0;i<results.face.length;i++) {
			// console.log("one face", face);
			if (results.face[i] != null) {
				faces.push(results.face[i])
			}		
		}
	}
  // console.log("BBB", faces)
  io.sockets.emit('init faces', results.face);
} 


drone.startPNGStream(function(fileName) {
    console.log("received image from startPNGStream - " + fileName)
    face.faceFind(fileName, processImage);
})

app.get('/',function(req, res){
  res.render('index');
});


io.sockets.on('connection', function(socket){
  // console.log("AAA", faces)
  socket.emit('init faces',faces);
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