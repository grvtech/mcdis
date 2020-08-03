function enableTooltips(){
	$('[data-toggle="tooltip"]').tooltip();
}




function getUser(sessionid){
	var uObj = null;
	let mreq = new GRVMessageRequest({"sessionid":sessionid},"getuser",sessionid,0);
	
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserBySession?language=en",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  contentType: 'application/json',
	      data: JSON.stringify(mreq)
		});
		request.done(function( json ) {
			console.log(json);
			let mres = new GRVMessageResponse(json);
			console.log(mres);
			userObj = mres.elements.user;
			console.log(userObj);
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		//
	return uObj;
}


function isLogin(sid){return isUserLoged(sid);}


function isUserLoged(sessionId){
	var result = false;var request = $.ajax({url: "/ncdis/service/data/isValidSession?uuidsession="+sessionId+"&language=en",type: "GET",async : false,cache : false,dataType: "json"});
	request.done(function( json ) {console.log(json);result = (json.status == 'success');});
	request.fail(function( jqXHR, textStatus ) {alert( "Request failed: " + textStatus );});
	getUser(sessionId);
	return result;
}


function logoutUser(sid){
	var request = $.ajax({url: "/ncdis/service/data/logoutSession?sid="+sid+"&language=en",type: "GET",async : false,dataType: "json"});
	request.done(function( json ) {var r = getParameterByName("ramq");if ((r != null) && (r != "")){$.cookie('ramq',r);}});
	request.fail(function( jqXHR, textStatus ) {alert( "Request failed: " + textStatus );});
	gti();
}


function getPage() {
	var result = {};
	result['url'] =  window.location.href;
    var index = result['url'].lastIndexOf("/") + 1;
    var filenameWithExtension = result['url'].substr(index);
    var filename = filenameWithExtension.split(".")[0]; 
    filename = filename.split("?")[0]; // <-- added this line
    if(filename == ""){filename="index";}
    result['view'] = filename;
    result['server'] = window.location.hostname;
    result['protocol'] = window.location.protocol;
    var vars = {};
    var url = window.atob(location.search.substring(1));
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    result['paramters'] = vars;
    return result;
}

function getParameterByName(name) {
	var url = window.atob(location.search.substring(1));
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec("?"+url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function getFieldConfig(field){
	var result = null;
	$.each(cdisfields, function(k,o){
		if(o.name == field){
			result = o;
		}
	});
	return result;
}


function getFieldValues(field, order="desc"){
	var result = [];
	let config = getFieldConfig(field);
	if(config.iddata > 0){
		if(field.indexOf('_and_') >= 0){
			/*
			 * this is a multi field we have to put all values by date
			 * */
			let idds = config.iddata.split('_and_');
			$.each(patientObjArray, function(i, v){
				$.each(idds,function(ii, idd){
					if(idd == v.iddata){
						if(result.length == 0 ){
							result.push(v);
						}else{
							for(var ii in result){
								if(result[ii].datevalue == v.datevalue){
									result[ii].value += " - "+v.value; 
								}
							}
						}
						
					}
				});
			});
		}else{
			$.each(patientObjArray, function(i, v){
				if(v.iddata == config.iddata){
					result.push(v);
				}
			});
		}
		result.sort(function(a,b){return new Date(b.datevalue) - new Date(a.datevalue);});
	}else{
		// iddata == 0 means is in record
		result.push(eval("patientObj."+field));
	}
	
	console.log(result);
	return result;
}

function getFieldLabel(field){
	return eval('cdislabels.common.'+field);
}

function getFieldLabelDate(field){
	return eval('cdislabels.common.'+field+'_collected_date');
}


function getIndexValue(value, values){
	var result = "";
	$.each(values, function(i,v){
		if(v.index == value){
			result = v.value;
		}
	});
	return result;
}

function renderFieldValue(field, value){
	var result = "";
	let config = getFieldConfig(field);
	let v = value;
	if(typeof(value) == "object"){v = value.value;}
	if(config != null){
		if(config.valuetype == "index"){
			/*value is an index in an array values in config*/
			result = getIndexValue(v, config.values);
		}else if(config.valuetype == "icon"){
			let cls = getIndexValue(v, config.values);
			result = "<i class='"+cls+"'></i>";
		}
	}else{
		result = value;
	}
	return result;
}

function renderFieldValueDate(field, value){
	var result = "";
	if(typeof(value) == "object"){
		result = moment(value.datevalue).format(cdisDateFormat);;
	}else{
		result = moment(value).format(cdisDateFormat);
	}
	return result;
}
