var arDrone = require('ar-drone')
  , fs = require("fs")
  , drone = {}


var client  = arDrone.createClient({
  converterPath: "avconv"
})


drone.startPNGStream = function(callback) {
  console.log("starting png stream")
  var stream = client.getPngStream();
  // fs.readFile('sample_face.jpg', function(err, data) {mmmmmmmm
  //   callback(data)
  // })

  stream.on('data', function(imageBuffer) {
    filename = "temp_image.png"
    fs.writeFile(filename, imageBuffer, function(err) {
      // console.log("image saved to " + filename)
      callback(filename)
    });
    
  });

}


module.exports = drone;