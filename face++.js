var http = require('https');

module.exports.face = function(api_secret,api_key){

//var picURL = "http%3A%2F%2Fwww.faceplusplus.com%2Fwp-content%2Fthemes%2Ffaceplusplus%2Fassets%2Fimg%2Fdemo%2F1.jpg%3Fv%3D2"
var picURL = "https://scontent-a.xx.fbcdn.net/hphotos-xfa1/t1.0-9/p480x480/10494650_10203694011051443_1904878853767976155_n.jpg"
var attribute = "glass,pose,gender,age,race,smiling"

var api_key = "5dbb712f5a8a4787da2ab34058b98876"
var api_secret = "cV-5DUanQmpt2EHIcUozVRfHXVTLlFzN"


//path: '/v2/detection/detect?url='+picURL*'&api_secret='+api_secret+'&api_key='+api_key+'&attribute='+attribute

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'apius.faceplusplus.com',
  path: '/v2/detection/detect?api_key='+api_key+'&api_secret='+api_secret+'&url='+picURL+'&attribute=age%2Cgender%2Crace%2Csmiling%2Cpose%2Cglass'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
}