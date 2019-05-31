var cdisSection = "dashboard";
$( window ).on( "load", initCdisPage );	


function initCdisPage(){
	var flag = isUserLoged(sid);
	
	if (!flag){
		logoutUser(sid);
	}else{
		initCdisHeader();
		loadTemplate(cdisSection);
	}	
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



		
		
		