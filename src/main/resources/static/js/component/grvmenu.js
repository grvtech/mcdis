/*
 * properties : parent, style=vertical or horisontal, 
 * elements : [{label, action} .....]
 */
export default function(elements, properties){
	if(elements.length <= 0 ) return false;
	let p = properties.parent;
	//alert(p.position().left+"     "+p.position().top+"    "+p.width()+"    "+p.height());
	
	let modal = $("<div>",{class:"grvmodal"}).appendTo($('body'));
	modal.on("mousedown",{parent:p} ,function(event){
		let cls = $(event.target).attr("class");
		if(cls.indexOf('grvmenu') < 0){
			$(event.data.parent).removeClass('selected');
			$(this).remove();
		}
	});
	
	let r = $('body').width() - (p.position().left + p.width()); 
	let containerStyle = 'position:absolute;top:'+(p.position().top + p.height())+'px;right:'+r+'px;';
	if(properties.style == "v"){
		containerStyle+="display:grid;grid-auto-flow:row;"
	}else{
		containerStyle+="display:grid;grid-auto-flow:column;"
	}
	let container = $("<div>",{class:"grvmenu", style:containerStyle}).appendTo(modal);
	$.each(elements,function(i,ob){
		let item = $("<div>",{class:"grvmenu-item"}).html(ob.label).appendTo(container);
		item.on('click',{action:ob.action,modal:modal,parent:p},function(event){
			$(event.data.parent).trigger(event.data.action);
			$(event.data.parent).removeClass('selected');
			$(event.data.modal).remove();
		});
	});
	modal.fadeIn(300);
}