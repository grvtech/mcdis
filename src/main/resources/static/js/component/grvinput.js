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
	let c = $('<div>',{class:'grv-input topup'}).appendTo(container);
	let w = properties.label.visualLength()+10;
	let iw = c.width() - w;
	
	let l = $('<label>',{for:properties.id}).text(properties.label).appendTo(c);
	l.css('position','absolute').css('width',w+'px').css('color','#cdcdcd').css('background-color','transparent').css('line-height',ph+'px');
	
	let i = $('<input>',{class:'grv-input-control',type:'text', id:properties.id, name:properties.id, required:true, value:properties.value}).appendTo(c);
	
	//i.css('border','none').css('width','100%').css('height','100%').css('line-height','1rem').css('border-radius','5px').css('padding-left','3px;');
	
	
	if(properties.style == 'classic'){
		
		i.on('focus',function(event){
			$(this).animate({marginLeft:w+'px',width:iw+"px", borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px'},{duration:300, easing:'swing'});
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d',color:'#ffffff'},{duration:500, easing:'swing'});
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd'},{duration:500, easing:'swing'});
				$(this).animate({marginLeft:"0px",width:$(this).parent().width()+"px", borderRadius:'5px'},{duration:500, easing:'swing'});
			}	
		});
	}else if(properties.style == 'topup'){
		i.on('focus',function(event){
			$(this).animate({marginLeft:w+'px',width:iw+"px", borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px'},{duration:300, easing:'swing'});
			$(this).siblings('label').animate({backgroundColor: '#4d4d4d',color:'#ffffff'},{duration:500, easing:'swing'});
		});
		i.on('focusout',function(event){
			if($(this).val().length == 0){
				$(this).siblings('label').animate({backgroundColor: 'transparent',color:'#cdcdcd'},{duration:500, easing:'swing'});
				$(this).animate({marginLeft:"0px",width:$(this).parent().width()+"px", borderRadius:'5px'},{duration:500, easing:'swing'});
			}	
		});
	}
	/**/
	
	return c;
}