jQuery(function($){
	var socket = io.connect();

	var faces = [];

	socket.on('init faces', function(data){
		console.log(data);
		faces = data;
	});

	socket.on('add faces',function(newFaces){
		faces = faces.concat(newFaces);
		console.log(faces);
	})
});