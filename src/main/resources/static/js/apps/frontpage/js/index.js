import frontpageConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'

export let messagesArray = [];

export default class GRVfrontpage{
	
	constructor(type){
		this.type = type;
		this.config = frontpageConfiguration;
		this.container = $('.'+this.config.container);
		loadcss(this.config.css);
		this.redraw(this.type, this.config.url, this.config.container);
		this.interval = setInterval(this.redraw, 5000, this.type, this.config.url, this.config.container);
	}

	static render(container, messages){
		container.empty();
		this.frontpageWidget = $('<div>',{class:'grv grv-frontpage-container shadow border carousel slide','data-ride':'carousel','data-interval':3000}).appendTo(container);
		var indicators = $('<ol>',{class:'carousel-indicators'}).appendTo(this.frontpageWidget);
		var inner = $('<div>',{class:'carousel-inner'}).appendTo(this.frontpageWidget);
		for(var i=0;i<messages.length;i++){
			var item = messages[i];
			var a = (i == 0)?'active':'';
			$('<div>',{class:'carousel-item '+a}).html(item.text).appendTo(inner);
			$('<li>',{class:a,'data-target':'.grv-frontpage-container', 'data-slide-to':i}).appendTo(indicators);
		}
	}
	
	
	redraw(type, url, container){
		
		var mes = $.ajax({
  		  url: url+'?type='+type,
  		  type: "GET",
  		  cache : false,
  		  dataType: "json"
  		});
  		mes.done(function( json ) {
  			var messages = json.elements.messages;
  			var update  = GRVfrontpage.isUpdate(messages,messagesArray);
  			if(update){
  				console.log('a');
  				messagesArray = messages;
  				console.log()
  				GRVfrontpage.render($('.'+container), messagesArray);
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
		$.each(messagesOld,function(i,o){keys.push(o.id);});
		$.each(messagesNew, function(index, message){
			if(!keys.includes(message.id))cnt++;
		})
		if(cnt > 0)result = true;
		return result;
	}
	
	
	
}
