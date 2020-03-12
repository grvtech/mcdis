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
	let cont = $('<div>',{class:'grvdropdown'}).appendTo(container);
	let f = $('<input>',{type:'hidden',value:'',id:id}).appendTo(cont);
	let c = $('<div>',{class:'grvdropdown-value'}).appendTo(cont);
	let clabel = $('<div>',{class:'grvdropdown-value-label'}).appendTo(c);
	let cicon = $('<div>',{class:'grvdropdown-value-icon'}).append($('<i>',{class:'fas fa-caret-down'})).appendTo(c);
	
	let m = $('<ul>',{class:'grvdropdown-menu'}).appendTo(cont);
	for(var i=0;i<elements.length;i++){
		let element = elements[i];
		let a = 'active';
		if(element.status != 'active'){
			a = '';
		}else{
			f.val(element.value);
			clabel.text(element.label);
		}
		$('<li>',{value:element.value,type:'button', class:'grvdropdown-item '+a}).text(element.label).appendTo(m);
	}
	m.on('click','li',function(event){
		//let p = event.target.parent();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$(this).parent().parent().siblings('input').val($(this).attr('value'));
		$(this).parent().siblings('button').text($(this).text());
	});
	
	return cont;
}