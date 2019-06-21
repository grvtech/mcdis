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
	let c = $('<div>',{class:'grv-input '+properties.style}).appendTo(container);
	
	
	
	let i = $('<input>',{class:'grv-input-control',type:'text', id:properties.id, name:properties.id, required:true, value:properties.value}).appendTo(c);
	let l = $('<label>',{for:properties.id}).text(properties.label).appendTo(c);
	
	return c;
}