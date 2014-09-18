$(function() {
	var socket = io.connect();
	socket.on('image', function(data) {
		$('#latestImg').attr( 'src', 'data:image/png;base64,' + data);
	})
	socket.on('actual_face', function(data){
		console.log('just got an actual face')
		console.log(data)
		var image = new Image();
		image.src='data:image/png;base64,'+data
		$("#faces").append(image)
	})
	socket.on('init faces', function(data){
		if (data == null) return;
		for (i = 0; i < data.length; i++) {
			faces.push(data[i])
		}
		getAnalytics()
		updateAgeAndGenderChart()
		updateRaceChart();
	});
});