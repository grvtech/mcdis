/*
 * MECANIC FUNCTIONS 
 * */

function loadTemplate(pageName){
	var ua = window.navigator.userAgent;
	var msie1 = ua.indexOf("Edge");
	var msie2 = ua.indexOf(".NET");
	var msie3 = ua.indexOf("MSIE");
	if((msie1 >= 0) || (msie2 >= 0)  || (msie3 >= 0)){
		$("<div>",{id:"dialog-msie"}).appendTo($("body")).html("<p>CDIS application is not supported using Internet Explorer or Edge Browser.</p><p>Please use <b>Chrome</b>  or <b>Firefox</b> browser.</p><p>If Chrome of Firefox are not installed on your computer please contact your system administrator.</p>");
		$("#dialog-msie").dialog({
			autoOpen: true,
		    resizable: false,
		    height: 350,
		    width: 400,
		    modal: true,
		    buttons: {
		      OK: function() {
		    	  $( this ).dialog( "close" );
		        }
		    },
		    close: function() { }
		  });
	}else{
		//$body.append($("<div>",{class:"cdismodal"}).append($("<div>",{class:"modal-span"}).text("CDIS Loading..."))).addClass("loading");
		/*
		if(callBack == null){
			$( "#wraper").load( "client/templates/"+pageName+".html");
		}else{
			$( "#wraper").load("client/templates/"+pageName+".html", callBack);
		}
		*/
		var pr = getParameterByName("ramq"); //required
		var sec = getParameterByName("section"); //optional  - default is dashboard
		var pact = getParameterByName("patientAction"); //optional  - default is dashboard
		
		if(pr == ""){
			//display message and go to search page
			gts(sid,language);
		}else{
			loadPatientObject(pr);
			if(sec == ""){sec = 'dashboard';}
			if(pact == ""){pact = null;}
			var obj = {data:{section:sec, action:pact}};
			obj = {data:{section:'lab'}};
			loadSection(obj);
		}
		/*
		setTimeout(function(){
			$body.removeClass("loading");
			$(".cdismodal").remove();
		},500);
		*/
	}
}


/*
 * function to apply user roles on the elements of the page
 * */
function initPage(){
	$(".uoptions").hide();
	if(userProfileObj.role.idrole > 1){
		$(".users").hide();
		$(".audit").hide();
		$(".uoptions").hide();
		$("#frontpage-button").hide();
		$(".frontpage").hide();
		$("#admin-report-list").hide();
		$("#deletepatient-button").hide();
	}
	
	if(userProfileObj.role.idrole > 2){
		$(".personalinfo").hide();
		$("#editpatient-button").hide();
		$("#addpatient-button").hide();
		$(".new-section-button-line").hide();
		$(".fnew").hide();
		$("#custom-reports-button").hide();
		$("#personal-report-list").hide();
		$(".value-graph-button").remove();
		$(".section-button-line").remove();
	}
	$("#search").focus();
	initNavigation();
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip(); 
	});

}





/*
 * PATIENT FUNCTIONS 
 * */

function loadDashboardPage(){
	//clearSections();
	$("#cdisDashboardPage").show();
	$("#cdisSectionsPage").hide();
	
	drawPatientRecord(patientObj);
	//drawABCGraphs();
	//populatePageside();
	
	/*
	$(".mainpage .main .page").load("/ncdis/client/templates/cdis.patient.html", function(patientObjArr){
		cdisSection = "patient";
		$(".side").hide();
		$(".cdismenu").hide();
		$("#menu li").removeClass("selected");
		$("#menu li").children(".patient_icon_").parent().addClass("selected");
		
		
		
		var hcpObject = patientObjArray[1];
		var cnt = 0;
		
		$.each(hcpObject,function(k,v){
			if(k != 'idpatient'){
				var n = '';
				$(usersArray).each(function(kk,vv){  
					if(vv.iduser == v){
						n = (capitalizeFirstLetter((vv.firstname).toLowerCase())+" "+capitalizeFirstLetter((vv.lastname).toLowerCase()));
					}
				});
				$("<tr>").append($("<td>",{class:"hcp-profession"}).text(profession_object[k])).append($("<td>",{class:"hcp-name"}).text(n)).appendTo($("#hcp"));
			}
		});
		initPage();
	});
	*/
}





function loadPatientObject(value){
	var patient = $.ajax({
		  url: "/ncdis/service/data/getPatientRecord?uuidsession="+sid+"&language=en&ramq="+value,
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		patient.done(function( json ) {
			patientObj = json.elements;
			
			//patientObj = patientObjArray[0];
			console.log("object patient");
			console.log(patientObj);
		});
		patient.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		  console.log(this.url);
		});	
}




function logout(){
	logoutUser(sid);
}

function logoutLocal(){
	logoutUserLocal(sid);
}


/* user action*/

function logoutUser(sid){
	var request = $.ajax({
		  url: "/ncdis/service/data/logoutSession?sid="+sid+"&language=en",
		  type: "GET",
		  async : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			var r = getParameterByName("ramq");
			if ((r != null) && (r != "")){
				$.cookie('ramq',r);
			}
		});
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	//window.location = "index.html";
		gti();
}


function getSession(iduser){
	var sid = "";
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserSession?iduser="+iduser+"&language=en",
		  type: "GET",
		  async : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			var sObj = json.elements.session;
			sid = sObj.idsession;
		});
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		//alert("SID IN GEt SESSION :"+sid);
	return sid;
}



function getUser(iduser){
	var uObj = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getUser?iduser="+iduser+"&language=en",
		  type: "GET",
		  async: false,
		  dataType: "json"
		});
		request.done(function( json ) {
			uObj = json.objs[0];
			
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		//
	return uObj;
}

function getPatientInfo(idpatient){
	var pObj = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getPatientInfo?idpatient="+idpatient+"&language=en",
		  type: "GET",
		  async: false,
		  dataType: "json"
		});
		request.done(function( json ) {
			pObj = json.objs[0];
			//console.log(pObj);
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return pObj;
}



function getUserProfile(iduser,idsystem){
	var uObj = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserProfile?iduser="+iduser+"&idsystem="+idsystem+"&language=en",
		  type: "GET",
		  async: false,
		  cache: false,
		  dataType: "json"
		});
		request.done(function( json ) {
			uObj = json.objs[0];
		});
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return uObj;
}

function getUserBySession(sessionId){
	var uObjArray = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserBySession?sid="+sessionId+"&language=en",
		  type: "GET",
		  async : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			uObjArray = json.objs;
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed:  error  " + textStatus );
		});
	return uObjArray;
}

function getUserMessages(userId){
	var mObjArray = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserMessages?iduser="+userId+"&language=en",
		  type: "GET",
		  async : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			mObjArray = json.objs;
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed:  error  " + textStatus );
		});
	return mObjArray;
}


function isUserLoged(sessionId){
	var result = false;
	//alert(sessionId);
	var request = $.ajax({
		  url: "/ncdis/service/data/isValidSession?uuidsession="+sessionId+"&language=en",
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			console.log(json);
			//alert("----"+json.status+"----");
			result = (json.status == 'success');
			
			/*
			var sObj = json.objs[0];

			if(sObj != null){
				if((sObj.idsession != null) && (sObj.idsession != "") ){
					userObj = getUserBySession(sObj.idsession);
					userProfileObj = getUserProfile(sObj.iduser, 1);
					result = true;
				}else{
					result = false;
				}
			}
			*/
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}


function getUsers(){
	var result = [];
	var request = $.ajax({
		  url: "/ncdis/service/data/getUsers?language=en",
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			result = json.objs;
						
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}

function getUserActions(){
	var result = [];
	var request = $.ajax({
		  url: "/ncdis/service/action/getUserActions?language=en",
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			result = json.objs[0];
						
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}

function getUserNotes(sessionid){
	var result = [];
	var request = $.ajax({
		  url: "/ncdis/service/action/getUserNotes?language=en&sid="+sessionid,
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			result = json.objs[0];
		});
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}


function getUserActionsTop5Dataset(){
	var result = [];
	var request = $.ajax({
		  url: "/ncdis/service/action/getUserActionsTop5Dataset?language=en",
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			result = json.objs;
						
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}

function getUsersTop5Dataset(){
	var result = [];
	var request = $.ajax({
		  url: "/ncdis/service/action/getUserTop5Dataset?language=en",
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
		request.done(function( json ) {
			result = json.objs;
						
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	return result;
}




function readNote(noteid){
	var mes = $.ajax({
		  url: "/ncdis/service/action/readPatientNote?sid="+sid+"&language=en&noteid="+noteid,
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
	mes.done(function( json ) {
			
	});
	mes.fail(function( jqXHR, textStatus ) {
	  console.log(this.url);
	});	
}

function deleteNote(noteid){
	var mes = $.ajax({
		  url: "/ncdis/service/action/deletePatientNote?sid="+sid+"&language=en&noteid="+noteid,
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
	mes.done(function( json ) {
			
	});
	mes.fail(function( jqXHR, textStatus ) {
	  console.log(this.url);
	});	
}


function getPatientNotes(section){
	$(".notesText").empty();
	var rm = getParameterByName("ramq");
	var mes = $.ajax({
	  url: "/ncdis/service/data/getPatientNotes?sid="+sid+"&language=en&ramq="+rm,
	  type: "GET",
	  async : false,
	  cache : false,
	  dataType: "json"
	});
	mes.done(function( json ) {
		notes = json.objs[0];
		var loggedUser = userObj[0];
		console.log(userProfileObj);
		
		
		if(section != "notes" && section != "patient"){
			//var notesPanelSide = $(".panel-notes");
			$(".panel-notes").empty();
			//console.log(notes);
			$.each(notes,function(index,objNote){
				var iduser = objNote.iduser;
				var user = getUser(iduser);
				var day = moment(objNote.notedate);
				
					if(objNote.viewed == "0"){
						if($(".panel-notes").length == 0){
							$("<div>",{class:"panel-notes uss"}).appendTo($(".pageside"));
						}
						var n = $("<div>",{class:"noteContainer",id:"note-"+index})
							.append("<span class='newNote'>New message</span> <span class='noteTimestamp'>"+day.format('YYYY-MM-DD')+"</span></br><span class='noteAuthor'>from <b> "+user.firstname+" "+user.lastname+" </b></span> ")
							.appendTo($(".panel-notes")	);
						n.click(function(){gtn(sid,"en",rm,objNote.idnote);});
					}
				
			});
		}else if(section == "notes"){
			$(".notesText").empty();
			$.each(notes,function(index,objNote){
				var iduser = objNote.iduser;
				var user = getUser(iduser);
				var userto = getUser(objNote.iduserto);
				var day = moment(objNote.notedate);
				var idn = objNote.idnote;
				var cls = "";
				if(objNote.viewed == "0"){
					cls = "<span class='newNote'>New</span>";
				}
				var n = $("<div>",{class:"noteContainer",id:"note-"+index})
							.append(cls+" <span class='noteTimestamp'>["+day.format('YYYY-MM-DD HH:mm:ss')+"]</span> <b>"+capitalizeFirstLetter(user.firstname)+" "+capitalizeFirstLetter(user.lastname)+"</b> for <b>"+capitalizeFirstLetter(userto.firstname)+" "+capitalizeFirstLetter(userto.lastname)+"</b>")
							.append($("<div>",{class:"note-header note-header-"+index})
									.append($("<div>",{class:"note-header-buttons",id:"toggleNote-"+objNote.idnote}).html("<i class='fa fa-close' aria-hidden='true'></i>"))
									
									)
							.append($("<div>",{class:"message",id:"message-"+objNote.idnote})
												.append($("<div>",{}).html(objNote.note))
												)
							.appendTo($(".notesText"));
				if(objNote.viewed == "0"){
					if(objNote.iduserto ==  userProfileObj.user.iduser){
						$("#message-"+objNote.idnote).append($("<div>",{class:"cisbutton",style:"margin:5px;",id:"note-"+objNote.idnote}).text("Acknowledge message").click(function(){readNote(objNote.idnote);$("#note-"+objNote.idnote).hide();}));
					}
					
				}
				
				if(userProfileObj.role.code == "ROOT" || userProfileObj.user.iduser == iduser){
					$(".note-header-"+index).append($("<div>",{class:"note-header-buttons",id:"delNote-"+objNote.idnote}).html("<i class='fa fa-trash' aria-hidden='true'></i>"));
				}
				
				
				$("#toggleNote-"+objNote.idnote).click(function(){
					$("#message-"+objNote.idnote).toggle();
					$("#toggleNote-"+objNote.idnote).empty();
					if($("#message-"+objNote.idnote).is(":visible")){
						$("#toggleNote-"+objNote.idnote).html("<i class='fa fa-close' aria-hidden='true'></i>");
					}else{
						$("#toggleNote-"+objNote.idnote).html("<i class='fa fa-square-o' aria-hidden='true'></i>");
					}
				});
				
				$("#delNote-"+objNote.idnote).click(function(){
					deleteNote(objNote.idnote);
					getPatientNotes("notes");
				});
				
			});
		}
		
	});
	mes.fail(function( jqXHR, textStatus ) {
	  console.log(this.url);
	});	
}



function populateRecord(){
	if($(".panel-record-name").length == 0){
		$("<div>",{class:"panel-record-name"}).appendTo($(".panel-record"));
	}
	$(".panel-record-name").text(patientObj.lname +" "+patientObj.fname);
	if($(".panel-record-ramq").length == 0){
		$("<div>",{class:"panel-record-ramq"}).appendTo($(".panel-record"));
	}
	$(".panel-record-ramq").text(patientObj.ramq);
	if($(".panel-record-chart").length == 0){
		$("<div>",{class:"panel-record-chart"}).appendTo($(".panel-record"));
	}
	$(".panel-record-chart").text(patientObj.chart);
	if($(".panel-record-community").length == 0){
		$("<div>",{class:"panel-record-community"}).appendTo($(".panel-record"));
	}
	$(".panel-record-community").text(patientObj.community);
	
	if($(".panel-record-dtype").length == 0){
		$("<div>",{class:"panel-record-dtype"}).appendTo($(".panel-record"));
	}
	$(".panel-record-dtype").text(dtype[patientObjArray[2].dtype.values[0].value]);
}

function populatePageside(){
	if(typeof(window["recomandation_"+cdisSection]) != "undefined"){
		loadRecomandation(window["recomandation_"+cdisSection]);
	}
	if(cdisSection != "patient" && cdisSection != "schedulevisits" && cdisSection != "editpatient" && cdisSection != "addpatient"){
		getPatientNextVisits(patientObjArray);
	}
	/*BMI out*/
	/*
	if(cdisSection == "mdvisits"){
		loadBMI(getObjectSection(patientObjArray));
	}
	*/
	getPatientNotes(cdisSection);
}

function getPatientNextVisits(poArr){
	
	var iduserchr = (poArr[1].chr!=null && poArr[1].chr!='')?poArr[1].chr.trim():'0';
	var idusermd = (poArr[1].md!=null && poArr[1].md!='')?poArr[1].md.trim():'0';
	var idusernur = (poArr[1].nur!=null && poArr[1].nur!='')?poArr[1].nur.trim():'0';
	var idusernut = (poArr[1].nut!=null && poArr[1].nut!='')?poArr[1].nut.trim():'0';
	var idpatient = poArr[0].idpatient;
	var now = moment();
	var svchr = getScheduleVisit(idpatient, iduserchr);
	if(!$.isEmptyObject(svchr)){
		if(typeof(svchr.datevisit) != "undefined"){
			var dd = moment(svchr.datevisit);
			var rcontainer = $("<div>",{class:"panel-visit uss"}).appendTo($(".pageside"));
			$("<div>",{class:"visit-title"}).text("CHR Next Visit").appendTo(rcontainer);
			if(moment(svchr.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
				$("<div>",{class:"visit-date currentvisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}else{
				$("<div>",{class:"visit-date futurevisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}
		}
	}
	
	var svmd = getScheduleVisit(idpatient, idusermd);
	if(!$.isEmptyObject(svmd)){
		if(typeof(svmd.datevisit) != "undefined"){
			var dd = moment(svmd.datevisit);
			var rcontainer = $("<div>",{class:"panel-visit uss"}).appendTo($(".pageside"));
			$("<div>",{class:"visit-title"}).text("MD Next Visit").appendTo(rcontainer);
			if(moment(svmd.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
				$("<div>",{class:"visit-date currentvisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}else{
				$("<div>",{class:"visit-date futurevisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}
		}
	}
	
	var svnur = getScheduleVisit(idpatient, idusernur);
	if(!$.isEmptyObject(svnur)){
		if(typeof(svnur.datevisit) != "undefined"){
			var dd = moment(svnur.datevisit);
			var rcontainer = $("<div>",{class:"panel-visit uss"}).appendTo($(".pageside"));
			$("<div>",{class:"visit-title"}).text("Nurse Next Visit").appendTo(rcontainer);
			if(moment(svnur.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
				$("<div>",{class:"visit-date currentvisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}else{
				$("<div>",{class:"visit-date futurevisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}
		}
	}
	var svnut = getScheduleVisit(idpatient, idusernut);
	if(!$.isEmptyObject(svnut)){
		if(typeof(svnut.datevisit) != "undefined"){
			var dd = moment(svnut.datevisit);
			var rcontainer = $("<div>",{class:"panel-visit uss"}).appendTo($(".pageside"));
			$("<div>",{class:"visit-title"}).text("Nutritionist Next Visit").appendTo(rcontainer);
			if(moment(svnut.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
				$("<div>",{class:"visit-date currentvisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}else{
				$("<div>",{class:"visit-date futurevisits"}).text(dd.format('MMMM YYYY')).appendTo(rcontainer);
			}
		}
	}
}

function loadRecomandation(recObj){
	var ww = $(window).width();
	var h = 750;
	var wh = $(window).height();
	$.each(recObj.recomandations,function(index,rObj){
		if(recObj.section == 'patient'){
			var rcontainer = $("<div>",{class:"recomandations"}).appendTo($("#rightPanel"));
		}else{
			var rcontainer = $("<div>",{class:"recomandations uss"}).appendTo($(".pageside"));
		}
		if($(window).height() < h){
			$("<div>",{class:"title"}).text(rObj.title).appendTo(rcontainer);
			var tub = $("<div>",{class:"thumbnail",style:"text-align:right;"}).append($("<img>",{src:"/ncdis/client/libs/images/"+rObj.thumbnail,height:"55px",width:"30px;"})).appendTo(rcontainer);
		}else{
			$("<div>",{class:"title"}).text(rObj.title).appendTo(rcontainer);
			var tub = $("<div>",{class:"thumbnail"}).append($("<img>",{src:"/ncdis/client/libs/images/"+rObj.thumbnail,height:"60px"})).appendTo(rcontainer);
		}
		
		rcontainer.click(function(){
			var modalWidth = 850;
			if(rObj.thumbnail == 'recomandation_ckd_thumbnail.png'){
				modalWidth = 950; 
			}
			$("#recomandation-modal").remove();
			$("<div>",{id:"recomandation-modal",title:rObj.title}).appendTo($("body"));
			$("#recomandation-modal").load("/ncdis/client/templates/"+rObj.source);
			
			if($(window).height() < h){
				h = $(window).height() - $(window).height()*0.02;
			}
			$("#recomandation-modal").dialog({
					autoOpen: false,
					height: h,
					width: modalWidth,
					modal: true,
			      show: {
			        effect: "blind",
			        duration: 1000
			      },
			      hide: {
			        effect: "blind",
			        duration: 1000
			      },
			      buttons: {
			    	  Print: function() {
			    		  var win = window.open('/ncdis/client/templates/'+rObj.source, '_blank');
			    		  if (win) {
			    		      //Browser has allowed it to be opened
			    		      win.focus();
			    		  } else {
			    		      //Browser has blocked it
			    		      alert('Please allow popups for CDIS');
			    		  }
				         },
			    	  Close: function() {
			            $( this ).dialog( "destroy" );
			            $("#recomandation-modal").remove();
			         }
			      }
			    });
			$( "#recomandation-modal" ).dialog( "open" );
		});
	});
	
	
}


function getScheduleVisit(idp,idu){
	var result = null;
	
	if(idp !=null &&idp!="" && idu!=null && idu!=""){
		var request = $.ajax({
			  url: "/ncdis/service/action/getScheduleVisit?language=en&sid="+sid+"&idpatient="+idp+"&iduser="+idu,
			  type: "GET",
			  async : false,
			  cache : false,
			  dataType: "json"
			});
			request.done(function( json ) {
				result = json.objs[0];
			});
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
	}
	return result;
}

function setScheduleVisit(scheduleid,iduser,idpatient,scheduledate,idprofesion,frequency,zone){
	var mes = $.ajax({
		  url: "/ncdis/service/action/setScheduleVisit?sid="+sid+"&language=en&idschedule="+scheduleid+"&iduser="+iduser+"&idpatient="+idpatient+"&scheduledate="+scheduledate+"&idprofesion="+idprofesion+"&frequency="+frequency+"&zone="+zone,
		  type: "GET",
		  async : false,
		  cache : false,
		  dataType: "json"
		});
	mes.done(function( json ) {
			
	});
	mes.fail(function( jqXHR, textStatus ) {
	  console.log(this.url);
	});	
}

function getUserPatients(userId,hcpcat){
	
	var mObjArray = null;
	var request = $.ajax({
		  url: "/ncdis/service/data/getUserPatients?iduser="+userId+"&language=en&hcpcat="+hcpcat,
		  type: "GET",
		  async : true,
		  dataType: "json"
		});
		request.done(function( json ) {
			var obArr = json.objs;
			//console.log(obArr);
			if(obArr.length === 0){
				$("<tr>",{class:"notvisits"}).appendTo($(".personal-patients table tbody"))
				.append($("<td>",{colspan:5,align:"center",style:"font-weight:bold;"}).text("No patient linked to this user!"));
				
			}else{
				$.each(obArr,function(index,obj){
					var dd = "";
					var now = moment();
					if(typeof(obj.datevisit)  != "undefined" ){
						dd = moment(obj.datevisit);
						if(moment(obj.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
							$("<tr>",{class:"currentvisits"}).appendTo($(".personal-patients table tbody"))
								.append($("<td>").text(obj.fullname))
								.append($("<td>").text(obj.chart))
								.append($("<td>").text(obj.ramq))
								.append($("<td>").text(obj.community))
								.append($("<td>").text(dd.format("MMM YYYY")))
								.click(function(){
									gtc(sid,"en", obj.ramq,"patient");
								});
						}
					}
				});
				$.each(obArr,function(index,obj){
					var dd = "";
					var now = moment();
					if(typeof(obj.datevisit)  != "undefined" ){
						dd = moment(obj.datevisit);
						if(!moment(obj.datevisit).isSame(now.format('YYYY-MM-DD'), 'month')){
							$("<tr>",{class:"futurevisits"}).appendTo($(".personal-patients table tbody"))
								.append($("<td>").text(obj.fullname))
								.append($("<td>").text(obj.chart))
								.append($("<td>").text(obj.ramq))
								.append($("<td>").text(obj.community))
								.append($("<td>").text(dd.format("MMM YYYY"))).click(function(){
									gtc(sid,"en", obj.ramq,"patient");
								});

						}
					}
				});
				$.each(obArr,function(index,obj){
					var dd = "";
					var now = moment();
					//console.log(obj);
					if(typeof(obj.datevisit)  == "undefined" ){
							$("<tr>",{class:"notvisits"}).appendTo($(".personal-patients table tbody"))
								.append($("<td>").text(obj.fullname))
								.append($("<td>").text(obj.chart))
								.append($("<td>").text(obj.ramq))
								.append($("<td>").text(obj.community))
								.append($("<td>").text("Not scheduled")).click(function(){
									gtc(sid,"en", obj.ramq,"patient");
								});

					}
				});
			}
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed:  error  " + textStatus );
		});
	return mObjArray;
}


