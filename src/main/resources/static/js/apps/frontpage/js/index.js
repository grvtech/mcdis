import frontpageConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'
import switchButton from '/ncdis/js/component/grvswitch.js'

export let messagesArray = [];

export default class GRVfrontpage{
	constructor(type){
		this.type = type;
		var view = page.view;
		this.config = eval("frontpageConfiguration."+view);
		this.config['type'] = type;
		loadcss(this.config.css);
		this.redraw(this.config);
		//this.interval = setInterval(this.redraw, 5000, this.type, this.config.url, this.config.container);
	}

	static render(config, messages){
		let container = $('.'+config.container);
		let toolbar = null;
		let indicators = null;
		container.empty();
		if(config.hastoolbar){
			toolbar = $('<div>',{class:'grv-message-toolbar'}).appendTo(container);
			if(config.minimize){
				let label = 'Minimize message panel';
				let mlabel = 'Maximize message panel';
				let sb = switchButton({'container':'grv-message-toolbar','label':label});
				let theight=0;
				sb.on('mousedown',function(){
					if(!$(this).find('input').is(':checked')){
						container.animate({
						    height: "65px"
						  },{
							duration:500,
							complete:function() {
								  
								    // Animation complete.
									  $(this).find('input').prop('checked', true);
									  $(this).find('.grv-switch-label').text(mlabel);
									  console.log('finish animate');
								  },
						  	start:function(){
						  		theight = $(this).parent().find('.grv-message-container').height();
						  	}
								  
						  });
					}else{
						container.animate({
						    height: (theight+25+10)+"px"
						  },{
							  duration:500,
							  complete:function() {
								    // Animation complete.
								  $(this).find('input').prop('checked', false);
								  $(this).find('.grv-switch-label').text(label);
								  console.log('finish animate');
							  }
						  });
					}
				});
			}
		}
		
		let frontpageWidget = $('<div>',{class:'grv grv-message-container shadow carousel slide','data-ride':'carousel','data-interval':config.period, 'data-wrap':true}).appendTo(container);
		if(config.hastoolbar){
			indicators = $('<ol>',{class:'carousel-indicators'}).appendTo(toolbar);
		}
		
		let  inner = $('<div>',{class:'carousel-inner'}).appendTo(frontpageWidget);
		for(var i=0;i<messages.length;i++){
			var item = messages[i];
			var a = (i == 0)?'active':'';
			var tag = null;
			if(item.new == 1){
				//tag =$('<div>',{class:'grv-message-tag-new'}).text('NEW');
				tag =$('<div>',{class:'grv-message-tag-new'}).append($('<span>').text('New')).append($('<div>'));
			}
			$('<div>',{class:'carousel-item '+a}).html(item.text).append(tag).appendTo(inner);
			if(config.hastoolbar){
				$('<li>',{class:a,'data-target':'.grv-message-container', 'data-slide-to':i}).appendTo(indicators);
			}
		}
		
		frontpageWidget.carousel();
		var handled=false;//global variable

		frontpageWidget.bind('slide.bs.carousel', function (e) {
		    var current=$(e.target).find('.carousel-item.active');
		    var indx=$(current).index();
		    if((indx+2)>$('.carousel-indicators li').length)indx=-1
		     if(!handled){
		        $('.carousel-indicators li').removeClass('active')
		        $('.carousel-indicators li:nth-child('+(indx+2)+')').addClass('active');
		     }else{
		        handled=!handled;//if handled=true make it back to false to work normally.
		     }
		});

		$(".carousel-indicators li").on('click',function(){
		   //Click event for indicators
		   $(this).addClass('active').siblings().removeClass('active');
		   //remove siblings active class and add it to current clicked item
		   handled=true; //set global variable to true to identify whether indicator changing was handled or not.
		});
		
		
	}
	
	

	redraw(config){
		var mes = $.ajax({
  		  url: config.url+'?type='+config.type,
  		  type: "GET",
  		  cache : false,
  		  dataType: "json"
  		});
  		mes.done(function( json ) {
  			var messages = json.elements.messages;
  			var update  = GRVfrontpage.isUpdate(messages,messagesArray);
  			if(update){
  				messagesArray = messages;
  				GRVfrontpage.render(config, messagesArray);
  			}
  			console.log(messagesArray);
  		});
  		mes.fail(function( jqXHR, textStatus ) {
  		  alert( "Error sending message : " + textStatus );
  		});	
	}
	
	
	
	static isUpdate(messagesNew, messagesOld){
		var result= false;
		var keys = [];
		var cnt = 0;
		if(messagesNew.length != messagesOld.length){
			result = true;
		}else{
			$.each(messagesOld,function(i,o){keys.push(o.id);});
			$.each(messagesNew, function(index, message){
				if(!keys.includes(message.id))cnt++;
			})
			if(cnt > 0)result = true;
		}
		return result;
	}
	
}
