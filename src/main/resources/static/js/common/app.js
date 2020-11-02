
function enableTooltips(){
	$('[data-toggle="tooltip"]').tooltip();
}

function getUser(sessionid){
	var uObj = null;let mreq = new GRVMessageRequest({"sessionid":sessionid},"getuser",sessionid,0);var request = $.ajax({url: "/ncdis/service/data/getUserBySession?language=en",type: "POST",async: false,dataType: "json",contentType: 'application/json',data: JSON.stringify(mreq)});
	request.done(function( json ) {
			let mres = new GRVMessageResponse(json);
			userObj = mres.elements.user;
	});
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});
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
	if(field == ''){
		return result;
	}else{
		
		let config = getFieldConfig(field);
		if(config.iddata == 0){
			// iddata == 0 means is in record
			result.push(eval("patientObj."+field));
		}else if(config.iddata == 100){
			result.push(patientHcp);
		}else{
			if(field.indexOf('_and_') >= 0){
				/*
				 * this is a multi field we have to put all values by date
				 * */
				let idds = config.iddata.split('_and_');
				$.each(patientObjArray, function(i, v){
					$.each(idds,function(ii, idd){
						if(idd == v.iddata){
							if(result.length == 0 ){
								var t = {"date":v.date,"value":"<span>"+v.value+"</span>","idvalue":v.idvalue+"@"+v.iddata};
								result.push(t);
							}else{
								var add = false;
								for(var iii in result){
									if(result[iii].date == v.date){
										result[iii].value += " <b>"+config.separator+"</b> <span>"+v.value+"</span>";
										result[iii].idvalue += "_"+v.idvalue+"@"+v.iddata;
										add = true;
										break;
									}
								}
								if(!add){
									var t = {"date":v.date,"value":v.value,"idvalue":v.idvalue+"@"+v.iddata};
									result.push(t);
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
		}
		
		
		
	}
	return result;
}

function getFieldLabel(field){
	if(field == '')return '';
	else return eval('cdislabels.common.'+field);
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
	if(field != '' && value != null){
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
			}else if(config.valuetype == "text"){
				result = value;
			}
		}else{
			result = value;
		}
	}
	console.log("render field value");
	console.log(result);
	return result;
}

function renderFieldValueDate(field, value){
	var result = "";
	if(typeof(value) == "object"){
		result = moment(value.date).format(cdisDateFormat);
	}else{
		result = moment(value).format(cdisDateFormat);
	}
	return result;
}



function renderWidget(object){
	var container = $('.'+object.name+'-'+object.style);
	let vnames = [];
	if(typeof(object.condition) != "undefined"){
		vnames = evaluateCondition(object.name, object.condition);
	}else{
		container.find("div [data]").each(function(){
			let d = $(this).attr("data");
			vnames.push(d);
		});
	}
	container.find("div [data]").each(function(){
		let d = $(this).attr("data");
		if ($.inArray(d, vnames) < 0){
			$(this).hide();
		}
	});
	if(vnames.length == 0){
		renderNoData(object);
	}
	console.log(" vname length : "+vnames.length);
	
	$.each(vnames, function(k, v){
		renderElement(v, object);
	});
	
	//buttons now
	var bcontainer = container.find('.buttons-container');
	console.log(userObj);
	$.each(object.menu,function(index, obj){
		var btn = $('<div>',{class:"btn",title:obj.label}).append($('<i>',{class:obj.icon})).appendTo(bcontainer);
		btn.on("click",eval(obj.action));
	});
}

function renderElement(value,object){
	/*
	 * if there is a condition we have to apply the condition rule
	 * */
	console.log("------------- treatment of : "+value);
	let f = getFieldConfig(value);
	console.log("field config");
	console.log(f);
	
	
	
	let c = $("."+value+"-container");
	if(f!=null){
		if(f.type == 'multi'){renderMulti(c,value,object);}
		else if(f.type == 'single'){renderSingle(c,value,object);}
		else if(f.type == 'graph'){renderGraph(c,value,object);}
	}else{renderSimple(c,value,object);}
	
}

function renderSimple(container, value, object){
	$("<div>",{class:"label"}).appendTo(container).text(getFieldLabel(value));
	console.log('-----------'+value);
	console.log(container);
	console.log(object);
	$("<div>",{class:"value"}).appendTo(container).text(renderFieldValue(value, eval('patientObj.'+value)));
}


function renderNoData(object){
	var c = $('.'+object.name+'-default');
	$("<div>",{class:"label"}).appendTo(c).text(getFieldLabel('nodata'));
}

function renderSingle(container, value, object){
	let vs = getFieldValues(value);
	let f = getFieldConfig(value);
	if(f.iddata == 0){
		$("<div>",{class:"label"}).appendTo(container).html(getFieldLabel(value));
		$("<div>",{class:"value"}).appendTo(container).html(renderFieldValue(value, vs[0]));
	}
}

function renderMulti(container, value, object){
	let f = getFieldConfig(value);
	let vs = getFieldValues(value);
	if(vs.length == 0){
		let r = $("<div>",{class:"r nodata"}).text("no data").appendTo(container);
	}else{
		$.each(vs, function(k, ob){
			if(f.iddata == 100){
				var fn = window[f.populate];
				if (typeof fn === "function"){
					fn.apply(null,[ob]);
				}
			}else{
				let r = $("<div>",{class:"r"+((k==0)?" last":"")+((f.hasdate ==1)?" hasdate":""),id:ob.idvalue}).appendTo(container);
				let vc = $("<div>",{class:"valuecell"}).appendTo(r);
				
				$("<div>",{class:"label"}).appendTo(vc).html(getFieldLabel(value));
				$("<div>",{class:"value"}).appendTo(vc).html(renderFieldValue(value,ob.value));
				if(f.hasdate == 1){
					let vd = $("<div>",{class:"datecell"}).appendTo(r);
					$("<div>",{class:"labeldate"}).appendTo(vd).html(getFieldLabelDate(value));
					$("<div>",{class:"valuedate"}).appendTo(vd).html(renderFieldValueDate(value,ob.date));
				}
			}
		});
	}
	
}


function evaluateCondition(value, condition){
	console.log('evaluate condition');
	console.log(value+'-------'+condition);
	let result = [];
	if(value.indexOf('_or_') >= 0){
		if(condition == 'last'){
			let vs = value.split('_or_');
			let vresult = "";
			let vdate = 0;
			$.each(vs, function(i, v){
				var d1 = getLastDate(v);
				if(d1 > vdate){
					vresult = v;
				}
			});
			if(vresult != ""){
				result.push(vresult);
			}
		}
	}else if(value.indexOf('_and_') >= 0 ){
		//result = value.split('_and_');
		result.push(value);
	}
	console.log(result);
	console.log('evaluate condition end');
	
	return result;
}	

function getLastDate(value){
	let vs = getFieldValues(value);
	if(typeof(vs) == 'Array')
		return vs[0].date;
	else
		return 0;
}


function renderGraph(container, value, object){
	let f = getFieldConfig(value);
	let vs = getFieldValues(value);
	console.log("the data name is :"+value);
	console.log(object);
	let menus = object.menu;
	if(menus.length > 0){
		let menucontainer = $(container).find('.menu-container');
		console.log(menucontainer);
		$.each(menus, function(i, item){
			let mi = $("<div>",{class:"menu-item"}).appendTo(menucontainer).html(item.label);
		});
	}
}
