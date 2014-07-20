var http = require('https')
  , keys = require('./config.js')
  , request = require("request");

module.exports.faceFind = function(fileName, callback){

   //path: '/v2/detection/detect?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&url='+picURL+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass'path: '/v2/detection/detect?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&url='+picURL+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass' 

  var picURL = "https://scontent-a.xx.fbcdn.net/hphotos-xfa1/t1.0-9/p480x480/10494650_10203694011051443_1904878853767976155_n.jpg"
  var attribute = "glass,pose,gender,age,race,smiling"

  var exec = require('child_process').exec,
      child;

  child = exec('curl -i -F api_key='+keys.api_key+' -F api_secret='+keys.api_secret+' -F attribute=age,gender,race -F img=@sample_face.jpg http://apius.faceplusplus.com/v2/detection/detect',
    function (error, stdout, stderr) {
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


