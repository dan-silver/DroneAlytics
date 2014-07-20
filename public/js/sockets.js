jQuery(function($){
	var socket = io.connect();

	var faces = [];

	socket.on('init faces', function(data){
		console.log(data);
		faces = data;
	});

	socket.on('add faces',function(data){
		faces.push(data);
		console.log(faces);
	})
});