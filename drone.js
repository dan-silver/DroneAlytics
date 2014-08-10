var arDrone = require('ar-drone'),
    slowDown = false;

var client  = arDrone.createClient({
  converterPath: "avconv",
  imageSize: "800x450"
})

setInterval(function() {
  slowDown = false
}, 2500)

module.exports.startPNGStream = function(callback) {
  var stream = client.getPngStream();

  stream.on('data', function(imageBuffer) {
    if (slowDown == true) {
      return
    }
    slowDown = true
    callback(imageBuffer)
  });
}