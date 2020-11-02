import widgetConfiguration from '../config.js'
import GRVMenu from '/ncdis/js/component/grvmenu.js'
export default function GRVWidget(valueName) {

		this.valueName = valueName;
		this.container = $("."+this.valueName+"-container");
		this.container.empty();
		 
		/*
		 * this is the window with the header + menu 3 dots + containers for graph widget or table widget or panel widget  wigrt types : graph table single (value) panel link button doc  
		 * the config of the widget is in define.js
		 * 
		 * */
		this.config = eval("widgetConfiguration."+valueName);
		this.widget = $("<div>",{class:"grvwidget"}).appendTo(this.container);
		
		let header = $("<div>",{class:"header"}).append($("<div>",{class:"title"}).append($("<div>",{class:"text"}).text(this.config.title)).append($("<div>",{class:"end"}))).appendTo(this.widget);
		if(this.config.actions.length > 0){
			let menu = $("<div>",{class:"menu"}).append($("<i>",{class:"fas fa-ellipsis-v"})).appendTo(header);
			menu.on("click",{config:this.config}, function(event){
				$(this).addClass("selected");
				let props = {"parent":$(this), "style":"v"};
				let m = new GRVMenu(event.data.config.actions, props);
			});
			$.each(this.config.actions, function(i, action){
				$(this.widget).on(action.action,{container:this.widget}, function(event){
					alert('a');
				});
			});
		}
		let body = $("<div>",{class:"body"}).appendTo(this.widget);
		body.empty();
		$.each(this.config.elements, function(key, object){
			let layout = sectionsPath+object.name+"-"+object.style+".html";
			let element = $("<div>",{class:"element"}).appendTo(body);
			element.load(layout,function(){
				renderWidget(object);
				
				/*
				 * here I check the condition
				 * */
				/*
				let vnames = [];
				if(typeof(object.condition) != "undefined"){
					vnames = evaluateCondition(object.name, object.condition);
				}else{
					$(this).find("div [data]").each(function(){
						let d = $(this).attr("data");
						vnames.push(d);
					});
				}
				
				$(this).find("div [data]").each(function(){
					let d = $(this).attr("data");
					if ($.inArray(d, vnames) < 0){
						$(this).hide();
					}
				});
				console.log('vnames');
				console.log(vnames);
				if(vnames.length == 0){
					renderNoData(object);
				}
				$.each(vnames, function(k, v){
					//let c = $("."+v+"-container");
					let f = getFieldConfig(v);
					renderElement(v, object);
				});
				*/
			});
		});
		
	
}