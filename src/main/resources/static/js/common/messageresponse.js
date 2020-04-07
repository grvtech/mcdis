class GRVMessageResponse{
	constructor(object){
		var result = object;
		if(object.state == 'clear'){
			if(result.elements && typeof(result.elements) == "object"){
				$.each(result.elements, function(index, value){
					result.elements[index] = value;
				});
			}
		}else{
			if(result.elements && typeof(result.elements) == "object"){
				console.log(result.elements);
				$.each(result.elements, function(index, value){
					//console.log(index +"      "+value+"    "+atob(value));
					result.elements[index] = atob(value);
				});
			}
		}
		return result;
	}
}