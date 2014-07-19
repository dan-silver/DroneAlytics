var http = require('https');
var keys = require('./config.js');

module.exports.faceFind = function(img){

   //path: '/v2/detection/detect?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&url='+picURL+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass'path: '/v2/detection/detect?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&url='+picURL+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass' 

    var picURL = "https://scontent-a.xx.fbcdn.net/hphotos-xfa1/t1.0-9/p480x480/10494650_10203694011051443_1904878853767976155_n.jpg"
    var attribute = "glass,pose,gender,age,race,smiling"


    var options = {
      host: 'apius.faceplusplus.com',
      method: 'post',
      path: '/v2/detection/detect?api_key='+keys.api_key+'&api_secret='+keys.api_secret+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass',
      headers: {
          'Content-Type': 'image/jpeg',
          'Content-Length': img.length
      }
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
            console.log(data);

            //facecompare(data.face[0].face_id,data.face[1].face_id);
        });
    }    

    var httpvar = http.request(options, callback);
    httpvar.write(img);
    httpvar.end();
}


    facecompare = function(face_id1,face_id2){
    
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

                console.log(str);
            });
        }    

        http.get(options, callback).end();

}
