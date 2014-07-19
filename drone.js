var arDrone = require('ar-drone')
  , fs = require("fs")
  , drone = {}


var client  = arDrone.createClient({
  converterPath: "avconv"
})


drone.startPNGStream = function(callback) {
  console.log("starting png stream")
  var stream = client.getPngStream();
  fs.readFile('sample_face.jpg', function(err, data) {
  	callback(data)
  })

/*  stream.on('data', function(imageBuffer) {
    callback(imageBuffer)
    // fs.writeFile('test.png', imageBuffer, function(err) {
    //   console.log("image saved")
    // });
    
  });
*/
}


module.exports = drone;