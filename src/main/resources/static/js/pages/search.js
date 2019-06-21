import Frontpage from '/ncdis/js/apps/frontpage/js/index.js';
import Search from '/ncdis/js/apps/search/js/index.js';

const frontpage = new Frontpage('frontpage');
const search = new Search();
/*
if (!isUserLoged(sid)){
	logoutUser(sid);
}else{
	loadTemplate(page,loadSearchTemplate);
}	
*/
function loadSearchTemplate(){
	if(isUserLoged(sid)){
		var pr = getParameterByName("ramq");
		var sec = getParameterByName("section");
		if(sec != ""){
			if(pr != ""){
				loadPatientObject("ramq",pr);
				loadSection(sec);
			}else{
				loadSection(sec);
			}
		}
		initPage();
	}else{
		logoutUser(sid);
	}
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



$('#search').focus();
/*
if(typeof(userObj[0].idprofesion) != "undefined"){
	var hcpcat = profession_index[userObj[0].idprofesion];
	var iduser = userObj[0].iduser;
	$("#userfullname").text( capitalizeFirstLetter(userObj[0].firstname)+" "+capitalizeFirstLetter(userObj[0].lastname));
	getUserPatients(iduser,hcpcat);	
}else{
	$(".personal-patients").hide();
}


if(userNotes.length > 0){
	$(".notes-alert").show();
	$.each(userNotes, function(i,not){
		var uzer = getUser(not.iduser);
		var patient = getPatientInfo(not.idpatient);
		$("<div>",{class:"message"})
			.append($("<span>").html("New message from <b>"+uzer.firstname+" "+uzer.lastname+ "</b> for the patient <b>"+patient.ramq+"</b>"))
			.append($("<div>",{class:"message-button"}).text("See Message").click(function(){
				//window.location = "cdis.html?section=notes&ramq="+patient.ramq+"&sid="+sid+"&language=en";
				gtc(sid,"en",patient.ramq,"notes");
			}))
		.appendTo($(".notes-alert"));
	});
	
}else{
	$(".cdisbody_patient_alerts").hide();
	$(".notes_icon_").css("background","none");
}

*/

/**/
$("#radios .btn").focusin(function() {
	$("#search").val("");
	$("#search").focus();
});

$("#linkedPatients").click(function(){
	$(".personal-patients table").toggle();
	if($(".personal-patients table").is(":visible")){
		$("#linkedPatients").text("Close Patient List");
	}else{
		$("#linkedPatients").text("Open Patient List");
	}
});




initNavigation();



var optionSelected = false;
$("#search").autocomplete({
	delay: 300,
	minLength: 2,
	autoFocus: true,
	source: function( request, response ) {
		$.ajax({
			url: "/ncdis/service/data/searchPatient",
			dataType: "json",
			data: {
				criteria: $("#radios :radio:checked").attr('id'),
				term: request.term,
				language: "en",
				uuidsession: sid,
				action: 'search'
			},
			success: function( data ) {
				console.log(data);
				response($.map( data.elements.search, function( row ) {
					console.log('array element');
					console.log(row);
					return {
						idpatient:row.idpatient,
						lastname:row.lastname,
						firstname : row.firstname,
						chart : row.chart,
						ramq : row.ramq,
						community: row.community,
						giu: row.giu,
						criteria : $("#radios :radio:checked").attr('id'),
						term : request.term
					}
				}));
			}
		});
	},
	select: function( event, ui ) {
		optionSelected = true;
		patientSearchObj = ui.item;
		console.log(patientSearchObj);
		//$.cookie('ramq',patientSearchObj.ramq);
		
		gtc(sid,"en",patientSearchObj.ramq,"dashboard");
		return false;
	},
	open: function() {
		optionSelected = false;
	},
	close: function() {
		if(!optionSelected){
    		$("#ub_cdisbody").fadeTo( "fast", 1 );
    	}
	}
}).data("ui-autocomplete")._renderItem = function(ul,item) {
		
		//console.log("item");
		//console.log(item);
		
		/**/
		//var $line = $("<a>");
		var $container = $("<div>");
		//$line.height("95px");
		if(item.criteria == "fnamelname"){
			var fn = (item.firstname+" "+item.lastname).toString().toLowerCase();
			fn = replaceAll(fn,item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
			$("<div>",{class:'searchname'}).appendTo($container).append($("<span>").html(fn.toUpperCase()));
		}else{
			$("<div>",{class:'searchname'}).appendTo($container).append($("<span>").html((item.firstname+" "+item.lastname).toUpperCase()));
		}
		$("<div>",{class:'searchcommunity'}).text(item.community).appendTo($container);
		if(item.criteria == "chart"){
			var cn = item.chart.toString();
			console.log(cn);
			cn = replaceAll(cn,item.term, "<strong>"+item.term+"</strong>");
			//$("<div>",{class:'searchchart'}).html("<label>Chart Number :</label> <span>"+cn+"</span>").appendTo($container);
			$("<div>",{class:'searchchart'}).html("<span> "+cn+" </span>").appendTo($container);
		}else{
			//$("<div>",{class:'searchchart'}).html("<label>Chart Number :</label> <span>"+item.chart+"</span>").appendTo($container);
			$("<div>",{class:'searchchart'}).html("<span>[ "+item.chart+" ]</span>").appendTo($container);
		}
		if(item.criteria == "ramq"){
			var ran = (item.ramq).toString().toLowerCase();
			ran = replaceAll(ran, item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
			$("<div>",{class:'searchramq'}).html("<span>"+ran.toUpperCase()+"</span>").appendTo($container);
		}else{
			$("<div>",{class:'searchramq'}).html("<span>"+item.ramq+"</span>").appendTo($container);
		}
		
		if(item.criteria == "ipm"){
			var gan = (item.giu).toString().toLowerCase();
			gan = replaceAll(gan, item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
			$("<div>",{class:'searchgiu'}).html("<span>"+gan.toUpperCase()+"</span>").appendTo($container);
		}else{
			$("<div>",{class:'searchgiu'}).html("<span>"+item.giu+"</span>").appendTo($container);
		}
		
		//var $line = $("<div>").text(item.chart);
		var $liline = $("<li>");
		//$liline.height("35px");
		$liline.append($container).appendTo(ul);
		$(ul).css("overflow-x","hidden");
		return $liline;
	};