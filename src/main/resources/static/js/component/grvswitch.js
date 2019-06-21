export default function (properties){
	let container = $('.'+properties.container);
	let cnt = $('<span>',{class:'grv-switch-container'}).appendTo(container);
	cnt.css('line-height','25px');
	cnt.css('right','5px');
	cnt.css('position','absolute');
	//cnt.css('top','5px');
	if(properties.label){$('<span>',{class:'grv-switch-label'}).css('padding-right','5px').text(properties.label).appendTo(cnt);}
	let ob = $('<label>',{class:'grv-switch'}).appendTo(cnt);
	$('<input>',{type:'checkbox'}).appendTo(ob);
	$('<span>',{class:'slider round'}).appendTo(ob);
	return cnt;
}