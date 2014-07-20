jQuery(function($){
	var socket = io.connect();
	console.log('starting sockets')
	socket.on('init faces', function(data){
		if (data == null) return;
		// console.log('in first socket loop', data);
		for (i = 0; i < data.length; i++) {
			console.log('this should be an obj',data[i]);
			faces.push(data[i])
		}
		// }
		// for (var face in data) {
		//  	if (face == null) continue;
		// 	faces.push(face)
		// }
		// console.log("A",faces)
		getAnalytics()
		updateAgeAndGenderChart()
		updateRaceChart();
	});
});