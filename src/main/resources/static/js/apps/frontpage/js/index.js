import frontpageConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'
import switchButton from '/ncdis/js/common/grvswitch.js'

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
		container.empty();
		if(config.minimize){
			let toolbar = $('<div>',{class:'grv-frontpage-toolbar'}).appendTo(container);
			let sb = switchButton(toolbar,'this is label');
			sb.on('mousedown',function(){
				if(!$(this).find('input').is(':checked')){
					container.animate({
					    height: "80px"
					  }, 500, function() {
					    // Animation complete.
						  console.log('finish animate');
					  });
				}else{
					container.animate({
					    height: "150px"
					  }, 500, function() {
					    // Animation complete.
						  console.log('finish animate');
					  })
				}
				//console.log('a');
				//console.log('b');
			});
		}
		let frontpageWidget = $('<div>',{class:'grv grv-frontpage-container shadow border carousel slide','data-ride':'carousel','data-interval':config.period, 'data-wrap':true}).appendTo(container);
		let indicators = $('<ol>',{class:'carousel-indicators'}).appendTo(frontpageWidget);
		let  inner = $('<div>',{class:'carousel-inner'}).appendTo(frontpageWidget);
		for(var i=0;i<messages.length;i++){
			var item = messages[i];
			var a = (i == 0)?'active':'';
			$('<div>',{class:'carousel-item '+a}).html(item.text).appendTo(inner);
			//$('<li>',{class:a,'data-target':'.grv-frontpage-container', 'data-slide-to':i}).appendTo(indicators);
		}
		
		
		frontpageWidget.carousel();
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
