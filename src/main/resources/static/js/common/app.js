function enableTooltips(){
	$('[data-toggle="tooltip"]').tooltip();
}


function isLogin(sid){return isUserLoged(sid);}


function isUserLoged(sessionId){
	var result = false;var request = $.ajax({url: "/ncdis/service/data/isValidSession?uuidsession="+sessionId+"&language=en",type: "GET",async : false,cache : false,dataType: "json"});
	request.done(function( json ) {console.log(json);result = (json.status == 'success');});
	request.fail(function( jqXHR, textStatus ) {alert( "Request failed: " + textStatus );});
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

