import Search from '/ncdis/js/apps/search/js/index.js';
const search = new Search();


var cdisSection = "dashboard";
$( window ).on( "load", initCdisPage );	


function initCdisPage(){
/*
	var flag = isUserLoged(sid);
	if (!flag){
		logoutUser(sid);
	}else{
		initCdisHeader();
		loadTemplate(cdisSection);
	}
*/	
}

//initCdisHeader();
//loadTemplate(cdisSection);


$("#cdisDashboardPage").show();
$("#cdisSectionsPage").hide();

drawPatientRecord(patientObj);


/*
 * load the good section of the page 
 * possible values : dashboard , patient (for add and edit), lab, renal, lipids, complications, 
 * */
function loadSection(obj){
	var section = obj.data.section;
	var action = obj.data.action;
	cdisSection = section;
	
	if(section == "dashboard"){
		loadDashboardPage();
	}else if(section == "patient"){
		loadPatientPage(action);
	}else{
		loadSectionPage(section);
	}
	
}


function loadSectionPage(section){
	//clearSections();
	$("#cdisDashboardPage").hide();
	$("#cdisSectionsPage").show();
	
	buildCdisMenu(appObj.menu, section);
	buildWidget(appObj.widgets.record, patientObj.record);
	
	//drawPatientRecord(patientObj);
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







var appObj={
		widgets:{
			record:{
				container:'patient-record-container',
				title:'Patient record',
				menu:{
					add:{
						label:'Add new patient',
						icon:'fas fa-user-plus',
						action : loadSection,
						parameter:{data:{section:'patient',action:'add'}}
					},
					edit:{
						label:'Modify patient data',
						icon:'fas fa-user-edit',
						action : loadSection,
						parameter:{data:{section:'patient',action:'edit'}}
					},
					delete:{
						label:'Delete patient',
						icon:'fas fa-user-minus',
						action : deletePatient,
						parameter:{}
					}
				},
				layout:'/ncdis/layouts/default_sections_patient-record.layout',
				value:'recordValue'
			}
		},
		menu:{
			container:'patient-menu-container',
			items: [
				{label:'Glucose Control',section:'lab'},
				{label:'Renal',section:'renal'},
				{label:'Lipids',section:'lipid'},
				{label:'Patient complications',section:'complications'},
				{label:'Miscellaneous',section:'miscellaneous'},
				{label:'',section:''},
				{label:'Patient Dashboard',section:'dashboard'},
			],
			callback:null
		}
		
}

var test=0;
function buildWidget(widgetObject, data){
	var container = $('.'+widgetObject.container);
	container.empty();
	
	/*<div class="block-title"><span>Patient Record</span><div></div></div>*/
	if(container){
		/*title*/
		$('<div>',{class:'block-title'}).append($('<span>').text(widgetObject.title)).append($('<div>')).appendTo(container);
		/*menu*/
		if(!$.isEmptyObject(widgetObject.menu)){
			/*<div class="block-wmenu"><div class="slider"></div><i class="fas fa-ellipsis-v"></i></div>*/
			var wmenuSlider = $('<div>',{class:'slider'}).appendTo($('<div>',{class:'block-wmenu'}).append($('<i>',{class:'fas fa-ellipsis-v'})).appendTo(container));
			$.each(widgetObject.menu, function(obKey,obValue){
				var item = $('<div>',{class:'slider-item','data-toggle':'tooltip',title:obValue.label}).append($('<i>',{class:obValue.icon})).appendTo(wmenuSlider);
				item.on("click",obValue.parameter,obValue.action);
			});
		}
		/*content*/
		$('<div>').appendTo(container).load(widgetObject.layout, function(){
			$.each($('['+widgetObject.value+']'), function(index,element){
				console.log($(this).text());
				var v = $(this).attr(widgetObject.value);
				//exceptions
				if(v == 'gender'){
					var dv = data.sex;
					$(this).addClass(dv=='2'?'fa-venus':'fa-mars');
				}else{
					$(this).text( eval("data."+$(this).attr(widgetObject.value) ) );
				}
				
			});
		});
		
	}
	
}

function deletePatient(){}



function buildCdisMenu(obj, section){
	var container = $('.'+obj.container);
	container.empty();
	var m = $('<ul>',{class:'sections-menu'}).appendTo(container);
	
	console.log(obj.items);
	
	
	$.each(obj.items,function(index, ob){
		var active = '';
		if(section == ob.section){active = 'active';}
		if(ob.section == ''){
			var li = $('<li>',{style:'flex:2 auto;'}).text('     ').appendTo(m);
		}else{
			var li = $('<li>',{class:'sections-menu-item '+active, 'data-toggle':'tooltip', title:ob.label}).text(ob.label).appendTo(m);
		}
		
		li.on("click",{section:ob.section},loadSection);
	})
	
}









function initCdisHeader(){
	$(".dropdown-item").click(function(){
		$('.dropdown-item').removeClass('active');
		$(this).addClass('active');
		$("#btnGroupDrop1").text($(this).text());
		var v = $(this).attr('value');
		$("#criteria").val(v);
		var l = ' number';
		if(v == 'name') l = '';
		$("#search").attr("placeholder","Search patient by "+$(this).text().toLowerCase()+l);
	});
	
	var optionSelected = false;
	$("#search").autocomplete({
		delay: 300,
		minLength: 2,
		autoFocus: true,
		position: { my : "left-100 top", at: "left bottom" },
		source: function( request, response ) {
			$.ajax({
				url: "/ncdis/service/data/searchPatient",
				dataType: "json",
				data: {
					criteria: $("#criteria").val(),
					term: request.term,
					language: "en",
					uuidsession: sid
				},
				success: function( data ) {
					response( $.map( data.elements.search, function( item ) {
						return {
							idpatient : item.idpatient,
							lastname : item.lastname,
							firstname : item.firstname,
							chart : item.chart,
							ramq : item.ramq,
							community: item.community,
							giu: item.giu,
							criteria : $("#criteria").val(),
							term : request.term
						};
					}));
				}
			});
		},
		select: function( event, ui ) {
			optionSelected = true;
			//clearSections();
			patientSearchObj = ui.item;
			gtc(sid,"en",patientSearchObj.ramq,"dashboard");
			return false;
		},
		open: function(event, ui) {
			optionSelected = false;
			
		},
		response: function(event, ui) {
			optionSelected = false;
			
		},
		close: function() {
			if(!optionSelected){
	    		$("#ub_cdisbody").fadeTo( "fast", 1 );
	    	}
		}
	}).data("ui-autocomplete")._renderItem = function(ul, item) {
			
			var $container = $("<div>",{});
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
				cn = replaceAll(cn,item.term, "<strong>"+item.term+"</strong>");
				$("<div>",{class:'searchchart'}).html("<span> "+cn+" </span>").appendTo($container);
			}else{
				$("<div>",{class:'searchchart'}).html("<span>"+item.chart+"</span>").appendTo($container);
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
			var $liline = $("<li>");
			$liline.append($container).appendTo(ul);
			return $liline;
		};

}





function drawPatientRecord(pObj){
	var patientRecord = pObj.record;
	//patientObj = prepareData(patientObj);
	
	var container = $('.patient-record-container');
	//container.empty();
	/*
	$("#patient-record div .record").each(function( index ) {
		if($( this ).attr("id") == "name_value"){
			$(this).text(patientObj.lname +" "+patientObj.fname);
		}else if($( this ).attr("id") == "sex_value"){
			if(patientObj.sex == "1"){
				$("#sex_value").text("Male");
			}else{
				$("#sex_value").text("Female");
			}
		}else if($( this ).attr("id") == "dtype_value"){
			var idtype = pObj[2].dtype.values[0].value;
			if(idtype == "10"){
				idtype= "3";
			}else if(idtype == "11"){
				idtype= "4";
			}
			$(this).text(dtype[idtype]);
		}else if($( this ).attr("id") == "ddate_value"){
				$("#ddate_value").text(pObj[2].dtype.values[0].date);
		}else{
			var att = $( this ).attr("id");
			if(typeof(att) != "undefined"){
				att = att.replace("_value","");
				$(this).text(eval("patientObj."+att));
			}
		}
	});
	
	
	var dobj = pObj[2];
	var vd = dobj.dtype.values;
	
	$.each(vd,function(index,val){
		var linie = $("<tr>",{id:"diabetid-"+val.idvalue});
		var cdate = $("<td>",{class:"diabet-history-value"}).text(val.date);
		var ii = val.value;
		if(val.value == "10"){ii=3;}
		if(val.value == "11"){ii=4;}
		
		var ctype = $("<td>",{class:"diabet-history-value"}).text(dtype[ii]);
		var btype = $("<td>",{class:"diabet-history-value"});
		linie.append(cdate);
		linie.append(ctype);
		linie.append(btype);
		if(vd.length > 1){
			if(userProfileObj.role.idrole == 1){
				var bb = $("<span>",{id:"diabet-"+val.idvalue}).html("<i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>").appendTo(btype);
				bb.click(function(){
					var $d = $("<div>",{id:"dialog-confirm",title:"Delete diabetes type"}).appendTo($("body"));
					var $p = $("<p>").text("This type of diabetes will be permanently deleted. Are you sure ?").appendTo($d); 
					$d.dialog({
					      resizable: false,
					      height: "auto",
					      width: 400,
					      modal: true,
					      buttons: {
					        "Delete diabates type": function() {
					        	deleteValue(val.idvalue,patientObjArray);
								$("#diabetid-"+val.idvalue).remove();
								if($("#diabet-history tr").length == 3){
									$(".diabet-history-value span").hide();
								}
								$( this ).dialog( "close" );
						        $(this.remove());
					        },
					        Cancel: function() {
					          $( this ).dialog( "close" );
					          $(this.remove());
					        }
					      }
					    });
				});
			}
		}		
		$("#diabet-history").append(linie);
		
	});
	$("#editpatient-button, #editpatient-button-second").click(function() {
		gtc(sid,"en",patientObj.ramq,"editpatient");
		//window.location = "cdis.html?section=editpatient&ramq="+patientObj.ramq+"&sid="+sid+"&language=en";
	});
	*/
}



/*

var d = null;
var dparent = null;
$('.grvhm').click(function(){
	//alert('a');
	dparent = $('.abcgraphs-container').parent();
	$('.abcgraphs-container').fadeOut(2000);
	d = $('.abcgraphs-container').detach();
	$('<div>').text('attach').appendTo(dparent).click(function(){
		$(this).empty();
		dparent.append(d);
		d.fadeIn("slow");
	});
});




var widgetPatientRecord = {
		title:'Patient Record',
		
		actions : [
			{
				label : 'add patient',
				class : 'fas fa-plus',
				callback : addPatient,
				roles:[1,2,3]
			},
			{
				label : 'edit patient',
				class : 'far fa-edit',
				callback : editPatient,
				roles: [1,2,3]
			}
		]
}

*/

		
		
		