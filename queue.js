


module.exports.get_array = function(faces,value,screening,callback){
	var array = [];
	for(i=0; i<array.length; i++){
		if(faces[i].attribute[screening].value === gender){
			array.push(array[i]);
		}
	}
	callback(array);

}