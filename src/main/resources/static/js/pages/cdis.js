	$(".dropdown-item").click(function(){
		$('.dropdown-item').removeClass('active');
		$(this).addClass('active');
		$("#btnGroupDrop1").text($(this).text());
		var v = $(this).attr('value');
		$("#criteria").val(v);
		var l = ' number';
		if(v == 'name') l = '';
		//$("#search").attr("placeholder","Search patient by "+$(this).text().toUpperCase() + ($(this).attr("value") == 'name')?'':' number');
		$("#search").attr("placeholder","Search patient by "+$(this).text().toLowerCase()+l);
		//alert($(this).attr('value'));
	});



$("#radios .btn").focusin(function() {
		$("#search").val("");
		$("#search").focus();
		$("#criteria").text($("#radios :radio:checked").parent().text());
		$("#radios").hide();
	});
	
	var c = getParameterByName("criteria");
	if(c != ""){
		$("#"+c).prop("checked", true).button("refresh");
		$("#criteria").text($("#radios :radio:checked").text());
	}
	
	$("#criteria").on("click",function(e){
		if(cdisSection != "dashboard"){
			$("#radios").show().delay(5000).fadeOut();	
		}
	});
	
	$("#menu li").each(function( index ) {
		var sclass = $(this).children("span").attr("class");
		var sec = sclass.substring(0,sclass.indexOf("_icon"));
		$(this).click(function() {
			//selectSection(sec);
			//window.location="cdis.html?section="+sec+"&ramq="+patientObj.ramq+"&sid="+sid+"&language=en";
			gtc(sid,"en",patientObj.ramq,sec);
		});
	});
	
	$(".cdisfooter-left").hover(function(){
		$(".leftfootermenu").toggle("fade");
	},function(){
		$(".leftfootermenu").toggle("fade");
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
			gtc(sid,"en",patientSearchObj.ramq,"patient");
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