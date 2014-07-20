var http = require('https')
  , keys = require('./config.js')
  , request = require("request");

module.exports.faceFind = function(fileName, callback){
  
  var exec = require('child_process').exec,
      child;
  console.log('fileName=',fileName)
  console.log('keys.api_key=',keys.api_key)
  child = exec('curl -i -F api_key=5dbb712f5a8a4787da2ab34058b98876 -F api_secret=cV-5DUanQmpt2EHIcUozVRfHXVTLlFzN -F attribute=age,gender,race -F img=@'+fileName+' http://apius.faceplusplus.com/v2/detection/detect',
    function (error, stdout, stderr) {
      console.log(stdout)
      console.log(stderr)
      console.log(error)
      curlRes = stdout
      curlRes = curlRes.split("\n")
      curlRes.splice(0,10)
      var resultObject = JSON.parse(curlRes.join("\n"))
      // console.log(resultObject);
      if (stderr) console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      } else if (resultObject != null) {
        callback(resultObject)
      }
  });

}


module.exports.facecompare = function(face_id1,face_id2,returnstuff){

  /*
  var face_id2 = "2a207e2d79a9746c4a5f6d55fa3e9724"
  var face_id1 = "e49eab1313ec3171b5c7a483aac9e38d"
  */

   var options = {
    host: 'apius.faceplusplus.com',
    path: '/v2/recognition/compare?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&face_id2='+face_id2+'&face_id1='+face_id1
  };

  callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            var data = JSON.parse(str);
            if(data.similarity >= 65){
                returnstuff(1);
            }
            else returnstuff(0);
                    
        });
    }    

    http.get(options, callback).end();

}


