import Frontpage from '/ncdis/js/apps/frontpage/js/index.js';
import Search from '/ncdis/js/apps/search/js/index.js';
import Widget from '/ncdis/js/apps/widget/js/index.js';
$( window ).on( "load", initSearchPage );	


function initSearchPage(){
	if(isLogin(sid)){
		
		const frontpage = new Frontpage('frontpage');
		const search = new Search();
		$(search).find('input[type=text]').focus();
		
		$('.main').find("[widget]").each(function(){
			let w = $(this).attr('widget');
			let wo = new Widget(w);
			pageWidgets.push(wo);
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
	
		$('.main').fadeIn(1000);
	}else{
		logoutUser(sid);
	}
}




