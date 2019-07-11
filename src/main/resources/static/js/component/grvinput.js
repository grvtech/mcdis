export default function(properties){
	/*
	 * properties is object format : {id, label, value, required,style, validations:[validation, ...]}
	 * validation values  presence|numeric|email|length|format   
	 * style : classic | bottomdown | topup 
	 * classic =  input label - label fades when writing
	 * bottom : label slides botom 
	 * 
	 * */
	let container = $('.'+properties.container);
	
	let pw = container.width();
	let ph = container.height();
	let c = $('<div>',{class:'grv-input'}).appendTo(container);
	if(properties.height)c.height(properties.height);
	if(properties.width)c.width(properties.width);
	let w = properties.label.visualLength()+10;
	let iw = c.width() - w;
	
	let l = $('<label>',{for:properties.id}).text(properties.label).appendTo(c);
	let i = $('<input>',{class:'grv-input-control',type:'text', id:properties.id, name:properties.id, required:true, value:properties.value}).appendTo(c);
	
	
	
	if(properties.style == 'leftside'){
		i.before($('<div>',{class:'grv-input-hspacer'}));
		i.after($('<div>',{class:'grv-input-hspacer'}));
		l.css('position','absolute').css('width','100%').css('color','#cdcdcd').css('background-color','transparent');
		l.css('line-height',c.height()+'px');
		i.on('focus',function(event){
			$(this).animate({marginLeft:w+'px',width:iw+"px", borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px'},{duration:300, easing:'swing'});
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d',color:'#ffffff',width : w +'px'},{duration:500, easing:'swing'});
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd'},{duration:500, easing:'swing'});
				$(this).animate({marginLeft:"0px",width:$(this).parent().width()+"px", borderRadius:'5px'},{duration:500, easing:'swing'});
			}	
		});
	}else if(properties.style == 'topup'){
		i.before($('<div>',{class:'grv-input-spacer'}));
		l.css('position','absolute').css('width',c.width()+'px').css('color','#cdcdcd').css('background-color','transparent').css('line-height',c.height()+'px');
		i.on('focus',function(event){
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d',fontSize:'0.7rem',height:"15px",lineHeight:'15px',color:'#ffffff', top:'0px'},{duration:300, easing:'linear'});
			
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd', height:$(this).parent().height()+'px',fontSize:'1vw', lineHeight:$(this).parent().height()+'px'},{duration:500, easing:'swing'});
			}	
		});
	}else if(properties.style == 'bottomdown'){
		i.after($('<div>',{class:'grv-input-spacer'}));
		l.css('position','absolute').css('width',c.width()+'px').css('color','#cdcdcd').css('background-color','transparent').css('line-height',c.height()+'px');
		
		i.on('focus',function(event){
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d', fontSize:'0.7rem',height:"15px",lineHeight:'15px',color:'#ffffff', bottom:'0px'},{duration:300, easing:'linear'});
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd', height:$(this).parent().height()+'px',fontSize:'1vw', lineHeight:$(this).parent().height()+'px'},{duration:500, easing:'swing'});
			}	
		});
	}else if(properties.style == 'rightside'){
		i.before($('<div>',{class:'grv-input-hspacer'}));
		i.after($('<div>',{class:'grv-input-hspacer'}));
		
		l.css('position','absolute').css('width','100%').css('height','100%').css('color','#cdcdcd').css('background-color','transparent');
		l.css('line-height',c.height()+'px');
		i.on('focus',function(event){
			$(this).animate({width:iw+"px", borderTopRightRadius:'0px', borderBottomRightRadius:'0px'},{duration:300, easing:'swing'});
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d',color:'#ffffff',width : w +'px', right:'0px'},{duration:500, easing:'swing'});
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd', width: '100%'},{duration:500, easing:'swing'});
				$(this).animate({marginLeft:"0px",width:$(this).parent().width()+"px", borderRadius:'5px'},{duration:500, easing:'swing'});
			}	
		});
	}
	i.css('height',(c.height()-15)+'px');
	/**/
	
	return c;
}