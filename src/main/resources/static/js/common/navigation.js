
/*
 * function to apply actions to buttons in the page
 * */

let navconfig = {
		"cdis":
			{	
				"cdisFullButton":function(){gtc(sid,applanguage,getParameterByName("ramq"),"mdvisits");},
				"personalinfo":function(){gto(sid,applanguage,"personalinfo");},
				"frontpage": function(){gta(sid,applanguage,"frontpage");},
				"users": function(){gta(sid,applanguage,"users");},
				"audit":function(){gta(sid,applanguage,"audit");},
				"freports":function(){gtr(sid,"en",null);},
				"flogout":function(){logoutUser(sid);},
				"fnew":function(){gtc(sid,applanguage,null,"addpatient");}
			},
			"search":
			{	
				"personalinfo":function(){gto(sid,applanguage,"personalinfo");},
				"frontpage": function(){gta(sid,applanguage,"frontpage");},
				"users": function(){gta(sid,applanguage,"users");},
				"audit":function(){gta(sid,applanguage,"audit");},
				"freports":function(){gtr(sid,"en",null);},
				"flogout":function(){logoutUser(sid);},
				"fnew":function(){gtc(sid,applanguage,null,"addpatient");},
				"reportsButton":function(){gtr(sid,"en",null);},
				"addpatientButton":function(){gtc(sid,applanguage,null,"addpatient");},
				"frontpageButton": function(){gta(sid,applanguage,"frontpage");}
				
			}
		
};


function initNavigation() {
	
	var btns = $('.grvbutton');
	var actions = eval("navconfig."+page.view);
	
	console.log(btns);
	console.log(actions);
	$.each(btns, function(i,btn){
		var id = $(btn).attr('id');
		var action = eval("actions."+id);
		if(typeof(action) == 'function'){
			$(btn).on('click', action);
		}
		
	});
	
	//$(".fback").click(function() {gts(sid,applanguage);	});
	$("#addpatient-button").click(function() {
		gtc(sid,applanguage,null,"addpatient");
		//window.location = "cdis.html?section=addpatient&sid="+sid+"&language=en";
	});
		
	$("#frontpage-button").click(function() {
		//gtc(sid,applanguage,null,"addpatient");
		//window.location = "cdis.html?section=frontpage&sid="+sid+"&language=en";
		gta(sid,applanguage,"frontpage");
	});
	/*
	$(".frontpage").click(function() {
		gta(sid,applanguage,"frontpage");
		//window.location = "cdis.html?section=frontpage&sid="+sid+"&language=en";
	});
	
	$(".personalinfo").click(function() {
		gto(sid,applanguage,"personalinfo");
		//window.location = "cdis.html?section=personalinfo&sid="+sid+"&language=en";
	});
	$(".users").click(function() {
		gta(sid,applanguage,"users");
		//window.location = "cdis.html?section=users&sid="+sid+"&language=en";
	});
	$(".audit").click(function() {
		gta(sid,applanguage,"audit");
		//window.location = "cdis.html?section=audit&sid="+sid+"&language=en";
	});
	*/
	$("#reports-button").click(function() {
		gtr(sid,"en",null);
		//window.location = "cdis.html?section=frontpage&sid="+sid+"&language=en";
	});
	
	
	$(".cdisfull").click(function(){
		gtc(sid,applanguage,getParameterByName("ramq"),"mdvisits");
	});
	init();
}

	function startReport(reportid){
		if(reportid == null){
			window.location = "reports.html?uuidsession="+sid;
		}else{
			window.location = "reports.html?uuidsession="+sid+"&reportid="+reportid;
		}
	}


	

	function gti(){window.location = "index.html";}/*go to index*/
	
	function gts(s,l){
		var p = window.btoa("uuidsession="+sid+"&language="+l);
		window.location = "search.html?"+p;
	}/*go to search*/
	function gtc(s,l,r,sec){
		var p = window.btoa("uuidsession="+sid+"&language="+l+"&section="+sec+"&ramq="+r);
		window.location = "cdis.html?"+p;
	}/*go to cdis*/
	function gtr(s,l,rid){
		var p = window.btoa("uuidsession="+sid+"&language="+l+"&reportid="+rid);
		window.location = "reports.html?"+p;
	}/*go to reports*/
	function gto(s,l,sec){
		var p = window.btoa("uuidsession="+sid+"&language="+l+"&section="+sec);
		window.location = "options.html?"+p;
	}/*go to options*/
	function gta(s,l,sec){
		var p = window.btoa("uuidsession="+sid+"&language="+l+"&section="+sec);
		window.location = "admin.html?"+p;
	}/*go to admin*/
	function gtn(s,l,r,idn){
		var p = window.btoa("uuidsession="+sid+"&language="+l+"&section=notes&ramq="+r+"&idnote="+idn);
		window.location = "cdis.html?"+p;
	}/*go to admin*/
	
	function init(){
		$(".common-cdisfooter-left").hover(function(){
			$(".leftfootermenu").toggle("fade");
		},function(){
			$(".leftfootermenu").toggle("fade");
		});
	}
	

