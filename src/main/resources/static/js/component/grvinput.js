export default function(properties){
	/*
	 * properties is object format : {id, label, value, required,style, validations:[validation, ...]}
	 * validation values  presence|numeric|email|length|format   
	 * style : classic | bottom | left | right | top 
	 * classic =  input label - label fades when writing
	 * bottom : label slides botom 
	 * 
	 * */
	let container = $('.'+properties.container);
	let pw = container.width();
	let ph = container.height();
	let c = $('<div>',{class:'grv-input '}).appendTo(container);
	c.css('position','relative').css('width','100%').css('height','100%');
	//alert(properties.label.visualLength());
	let w = properties.label.visualLength()+10;
	let l = $('<label>',{for:properties.id}).text(properties.label).appendTo(c);
	l.css('position','absolute').css('width',w+'px').css('height',ph+'px').css('padding','3px').css('line-height',ph+'px').css('color','black');
	
	let i = $('<input>',{class:'grv-input-control',type:'text', id:properties.id, name:properties.id, required:true, value:properties.value}).appendTo(c);
	i.css('border','none').css('width','100%').css('height','100%').css('line-height','1rem').css('border-radius','5px');
	if(properties.style == 'classic'){
		let iw = c.width() - w;
		i.on('focus',function(event){
			$(this).css('outline','none').css('border','none');
			$(this).animate({marginLeft:w+"px", width:iw+"px"},{duration:500, easing:'swing'});});
		i.on('focusout',function(event){$(this).animate({marginLeft:"0px", width:$(this).parent().width()+"px"},{duration:500, easing:'swing'});});
	}
	
	
	return c;
}