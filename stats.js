module.exports.stat = function(faces,callback){
	var male = 0, female = 0;

	for(i=0;i<faces.length;i++){
		if(faces[i].attribute.gender === "male"){
			male++;
		}
		else{
			female++;
		}
	}

	callback(male, female)
}