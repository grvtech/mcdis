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
	let c = $('<div>',{class:'grvinput'}).appendTo(container);
	let type = 'text';
	
	if(properties.type){type=properties.type;}
	let l = $('<div>',{class:'grvinput-label'}).text(properties.label).appendTo(c);
	let ic = $('<div>',{class:'grvinput-control'}).appendTo(c);
	let i = $('<input>',{type:type, id:properties.id, name:properties.id, required:true, value:properties.value}).appendTo(ic);
	
	let fs = i.css('font-size');
	let lw = properties.label.visualLength(fs)+10;
	
	
	
	if(properties.style == 'leftside'){
		c.css('grid-template-columns',(lw+7)+'px auto');
		l.css('width',(lw+7)+'px');
		i.on('focus',function(event){
			$(this).parent().addClass('focus');
			$(this).parent().siblings().addClass('focus');
		});
		
		i.on('focusout',function(event){
			$(this).parent().removeClass('focus');
			$(this).parent().siblings().removeClass('focus');
		});
		
	}else if(properties.style == 'topside'){
		c.css('grid-template-rows','auto auto');
		i.on('focus',function(event){
			$(this).parent().addClass('focus');
			$(this).parent().siblings().addClass('focus');
		});
		
		i.on('focusout',function(event){
			$(this).parent().removeClass('focus');
			$(this).parent().siblings().removeClass('focus');
		});
	}else if(properties.style == 'bottomside'){
		c.css('grid-template-rows','auto auto');
		l.detach().insertAfter(ic);
		i.on('focus',function(event){
			$(this).parent().addClass('focus');
			$(this).parent().siblings().addClass('focus');
		});
		
		i.on('focusout',function(event){
			$(this).parent().removeClass('focus');
			$(this).parent().siblings().removeClass('focus');
		});
	}else if(properties.style == 'rightside'){
		c.css('grid-template-columns','auto '+(lw+7)+'px');
		l.detach().insertAfter(ic);
		i.on('focus',function(event){
			$(this).parent().addClass('focus');
			$(this).parent().siblings().addClass('focus');
		});
		
		i.on('focusout',function(event){
			$(this).parent().removeClass('focus');
			$(this).parent().siblings().removeClass('focus');
		});	
	}
	
	/**/
	
	return c;
}