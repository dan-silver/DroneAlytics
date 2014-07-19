var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var drone = {}

drone.startPNGStream = function() {
  console.log("starting png stream")
  var pngStream = client.getPngStream();
  pngStream.on('data', console.log);
}

module.exports = drone;