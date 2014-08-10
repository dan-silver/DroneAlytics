var arDrone = require('ar-drone'),
    fs = require("fs"),
    drone = {},
    slowDown = false;

var client  = arDrone.createClient({
  converterPath: "avconv",
  imageSize: "800x450"
})

setInterval(function() {
  slowDown = false
}, 2500)

drone.startPNGStream = function(callback) {
  var stream = client.getPngStream();

  stream.on('data', function(imageBuffer) {
  console.log('raw png rec')
    if (slowDown == true) {
      return
    }
    slowDown = true
    callback(imageBuffer)
  });
}

module.exports = drone;