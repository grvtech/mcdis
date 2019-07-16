/*
 * properties : object format : {direction:v|h, open:1|0, multivalue:1|0, name, id, class, container }
 * 
 * elements : array of objects format object : {id, label, value, status}
 * 
 * */
export default function(elements, properties){
	if(elements.length <= 0 ) return false;
	let  id, cls, container;
	if(properties){
		id = (properties.id)?properties.id:'grvdropdown-'+moment().unix();
		cls = (properties.class)?properties.class:'grvdropdown';
		container  = (properties.container)?$('.'+properties.container):$('.grvdropdown-container');
	}else{
		id = 'grvdropdown-'+moment().unix();
		cls = 'grvdropdown';
		container = $('.grvdropdown-container');
	}
	let f = $('<input>',{type:'hidden',value:'', id:id}).appendTo(container);
	let c = $('<div>',{class:'btn-group'}).appendTo(container);
	let b = $('<button>',{type:'button',id:id+'Dropdown',class:'btn dropdown-toggle','data-toggle':'dropdown', 'aria-haspopup':'true', 'aria-expanded':'false'}).appendTo(c);
	
	let m = $('<div>',{class:'dropdown-menu', 'aria-lebaledby':id+'Dropdown'}).appendTo(c);
	for(var i=0;i<elements.length;i++){
		let element = elements[i];
		let a = 'active';
		if(element.status != 'active'){
			a = '';
		}else{
			f.val(element.value);
			b.text(element.label);
		}
		$('<button>',{value:element.value,type:'button', class:'dropdown-item '+a}).text(element.label).appendTo(m);
	}
	m.children('button').on('click',function(event){
		//let p = event.target.parent();
		$(this).siblings('button').removeClass('active');
		$(this).addClass('active');
		$(this).parent().parent().siblings('input').val($(this).attr('value'));
		$(this).parent().siblings('button').text($(this).text());
	});
	return container;
}