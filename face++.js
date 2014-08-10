var http = require('https'),
    keys = require('./config.js'),
    request = require("request"),
    path = require('path');

module.exports.faceFind = function(imgBuffer, callback) {

  url = "http://apius.faceplusplus.com/v2/detection/detect"
  var r = request.post(url, {json: true}, function(err, data, body) {
    if (err) throw err;
    callback(body)
  })

  var form = r.form();
  form.append("api_key", keys.api_key)
  form.append("api_secret", keys.api_secret)
  form.append("img", imgBuffer, {filename: 'a.jpg'})
}

module.exports.facecompare = function(face_id1,face_id2,returnstuff) {
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