export default function(properties){
	/*
	 * properties is object format : {id, container,title,  styleclass, labels, datasets[{dataset 1},{dataset2}], annotations, min, max}
	 *    
	 * 
	 * */
	let container = $('.'+properties.container);
	let pw = container.width();
	let ph = container.height();
	
	if(properties.styleclass){
		container.addClass(styleclass);
	}
	let wid = properties.id;
	if(!properties.id){
		wid = 'widget_'+moment().unix();
	}
	let widget = $('<div>',{class:'widget-container',id:wid+'_Widget'}).appendTo(container);

	let menu = $('<div>',{class:'widget-menu-container'}).appendTo(widget);
	let graph = $('<div>',{class:'widget-graph-container'}).append($('<canvas>',{id:wid+'_WidgetCanvas'})).appendTo(widget);
	/*menu*/
	let table = $('<div>',{class:'widget-menu-item'}).append($('<i>'),{class:'fas fa-table'}).appendTo(menu);
	let history = $('<div>',{class:'widget-menu-item'}).append($('<i>'),{class:'fas fa-history'}).appendTo(menu);
	let add = $('<div>',{class:'widget-menu-item'}).append($('<i>'),{class:'fas fa-plus'}).appendTo(menu);
	let print = $('<div>',{class:'widget-menu-item'}).append($('<i>'),{class:'fas fa-print'}).appendTo(menu);
	
	let config = {
			type: 'line',
			data: {labels: properties.labels,datasets: properties.datasets},
			options: {
				annotation: {annotations: properties.annotations},
				responsive: true,
				title: {display: true,text: properties.title},
				tooltips: {mode: 'index',intersect: false,},
				hover: {mode: 'nearest',intersect: true},
				scales: {
					xAxes: [{display: true,scaleLabel: {display: true,labelString: 'Time'}}],
					yAxes: [{display: true,ticks:{suggestedMax: properties.max,suggestedMin: properites.min,},scaleLabel: {display: true,labelString: 'Value'}}]
				}
			}
	};
	
	let ctx1 = document.getElementById(wid+'_WidgetCanvas').getContext('2d');
	window.myLine1 = new Chart(ctx1, config);
	
	
			
	return widget;
}