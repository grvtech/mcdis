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
		this.carouselid = 0;
		this.index = 0;
		this.redraw(this.config);
		this.carousel(this.config);
	}

	static render(config, messages){
		
		let container = $('.'+config.container);
		let toolbar = null;
		let indicators = null;
		container.empty();
		let widget = $('<div>',{class:'grvmessage','data-interval':config.period}).appendTo(container);
		let msgs = $('<div>',{class:'grvmessage-container umbra','data-interval':config.period}).appendTo(widget);
		toolbar = $('<div>',{class:'grvmessage-toolbar'}).appendTo(widget);

		if(config.hastoolbar){indicators = $('<ol>',{class:'grvmessage-indicators'}).appendTo(toolbar);}
		
		for(var i=0;i<messages.length;i++){
			var item = messages[i];
			var a = (i == 0)?'active':'';
			var tag = null;
			if(item.new == 1){tag = $('<div>',{class:'grvmessage-tag-new'}).append($('<span>').text('New')).append($('<div>'));}
			$('<div>',{class:'grvmessage-item item'+i+' '+a}).html(item.text).append(tag).append($('<p>').html(item.resumat)).appendTo(msgs);
			if(config.hastoolbar){$('<li>',{class:a + ' dot dot'+i, 'slideIndex':i}).appendTo(indicators);}
		}

		$(".grvmessage-indicators li").on('click',function(){
		   $(this).addClass('active').siblings().removeClass('active');
		   let idx = $(this).attr("slideIndex");
		   $('.item'+idx).siblings().removeClass('active').hide();
		   $('.item'+idx).fadeIn(1000, function(){
			   $(this).addClass('active');
			   $(this).trigger("fadeInComplete");
		   });
		});
		
	}
	

	carousel(config){
		this.carouselid = setInterval(function(obj){
			if(obj.index >= messagesArray.length ){
				obj.index = 0; /*reset index if more than lease*/
			}
			$('.dot'+obj.index).addClass('active').siblings().removeClass('active');
			$('.item'+obj.index).siblings().removeClass('active').hide();
			$('.item'+obj.index).fadeIn(1000, function(){
				   $(this).addClass('active');
		   });
		obj.index++;
		},config.period, this);
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
  			//var update  = GRVfrontpage.isUpdate(messages,messagesArray);
  			//if(update){
  			messagesArray = messages;
  			GRVfrontpage.render(config, messagesArray);
  			
  			//}
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
