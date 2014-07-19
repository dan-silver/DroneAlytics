var arDrone = require('ar-drone');
var client  = arDrone.createClient({
	converterPath: "avconv"
})
  , fs = require("fs")

var drone = {}

drone.startPNGStream = function() {
  console.log("starting png stream")
  var stream = client.getPngStream();
  stream.on('data', drone.processImage);
}

drone.processImage = function(imageBuffer) {
  fs.writeFile('test.png', imageBuffer, function(err) {
    console.log("image saved")
  });
}

module.exports = drone;