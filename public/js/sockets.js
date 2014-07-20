jQuery(function($){
	var socket = io.connect();

	socket.on('init faces', function(data){
		console.log(data);
		faces = data;
		getAnalytics();
	});

	socket.on('add faces',function(newFaces){
		faces = faces.concat(newFaces);
		console.log(faces);
		getAnalytics();
	})
});