var arDrone = require('ar-drone'),
    fs = require("fs"),
    drone = {},
    slowDown = true

var client  = arDrone.createClient({
  converterPath: "avconv",
  imageSize: "800x450"
})

drone.startPNGStream = function(callback) {
  console.log("starting png stream")
  var stream = client.getPngStream();

  stream.on('data', function(imageBuffer) {
    if (slowDown == true)
      slowDown = false
    else
      return
    callback(imageBuffer)
  });
}

setInterval(function() {
  slowDown = true
}, 2000)

module.exports = drone;