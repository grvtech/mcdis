/*
 * properties : object format : {direction:v|h, open:1|0, multivalue:1|0, name, id, class, container }
 * 
 * elements : array of objects format object : {id, label, value, status}
 * 
 * */
export default function(elements, properties){
	if(elements.length <= 0 ) return false;
	let direction, open, multivalue, id, cls, container;
	if(properties){
		direction = (properties.direction)?properties.direction:'v'; //vertical by default
		open = (properties.open)?properies.open:0; //close by default
		multivalue = (properties.multivalue)?properties.multivalue:0; //radio behaivion by default
		id = (properties.id)?properties.id:'grvlist-'+moment().unix();
		cls = (properties.class)?properties.class:'grvlist';
		container  = (properties.container)?$('.'+properties.container):$('.grvlist-container');
	}else{
		direction = 'v'; //vertical by default
		open = 0; //close by default
		multivalue = 0; //radio behaivion by default
		id = 'grvlist-'+moment().unix();
		cls = 'grvlist';
		container = $('.grvlist-container');
	}
	let cont = $('<div>',{class:'grvlist'}).appendTo(container);
	let c = $('<ul>',{class:'grvlist-group-'+direction}).appendTo(cont);
	let f = $('<input>',{type:'hidden',value:'', id:id}).appendTo(cont);
	
	for(var i=0;i<elements.length;i++){
		let element = elements[i];
		let a = 'active';
		if(element.status != 'active'){ a = '';}else{f.val(element.value);}
		$('<li>',{value:element.value, class:'grvlist-group-item '+a}).text(element.label).appendTo(c);
	}
	c.children('li').on('click',function(event){
		//let p = event.target.parent();
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		$(this).parent().siblings('input').val($(this).attr('value'));
		$(this).parent().siblings('input').trigger('change');
	});
	return container;
}