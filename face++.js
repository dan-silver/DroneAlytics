var http = require('http');

module.exports.face = function() {
    // Face++ API
    var API_KEY = 9d6a99bbb5fe5a0b10d59dc10dbf7b16;
    var API_SECRET = xuv78oYAF-TgYy-tEtjWXIiKtFwlQIrc;

    var picURL = "http%3A%2F%2Ffaceplusplus.com%2Fstatic%2Fimg%2Fdemo%2F1.jpg"
    var attribute = "glass,pose,gender,age,race,smiling"

    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: 'https://apius.faceplusplus.com',
        path: '/v2/detection/detect?url=' + picURL + '&api_secret=' + API_SECRET + '&api_key=' +
            API_KEY + '&attribute=' + attribute
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

    http.request(options, callback).end();
}