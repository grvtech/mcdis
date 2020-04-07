class GRVMessageRequest{
	constructor(objectArray,action,idsession,iduser,encrypted=true){
		var result = {};
		result['uuidsession'] = idsession;
		result['action'] = action;
		result['state']  = (encrypted)?'enc':'clear';
		Object.keys(objectArray).forEach(function(key) {
			var k = key;
			var v = objectArray[key];
			console.log(key, objectArray[key]);
			objectArray[key] = btoa(v);
			console.log(key, objectArray[key]);
		});
		result['elements'] = objectArray;
		return result;
	}
}