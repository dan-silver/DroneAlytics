var http = require("http"),
    drone = require("./node_modules/dronestream/lib/server");


var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server);
server.listen(5555);
