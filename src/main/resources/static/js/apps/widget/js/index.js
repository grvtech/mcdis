import widgetConfiguration from '../config.js'
import GRVMenu from '/ncdis/js/component/grvmenu.js'
export default class GRVWidget {

	constructor(valueName){
		let container = $("."+valueName+"-container");
		container.empty();
		/*
		 * this is the window with the header + menu 3 dots + containers for graph widget or table widget or panel widget  wigrt types : graph table single (value) panel link button doc  
		 * the config of the widget is in define.js
		 * 
		 * */
		let config = eval("widgetConfiguration."+valueName);
		let widget = $("<div>",{class:"grvwidget"}).appendTo(container);
		
		let header = $("<div>",{class:"header"}).append($("<div>",{class:"title"}).append($("<div>",{class:"text"}).text(config.title)).append($("<div>",{class:"end"}))).appendTo(widget);
		if(config.actions.length > 0){
			let menu = $("<div>",{class:"menu"}).append($("<i>",{class:"fas fa-ellipsis-v"})).appendTo(header);
			menu.click(function(event){
				$(this).addClass("selected");
				let props = {"parent":$(this), "style":"v"};
				let m = new GRVMenu(config.actions, props);
			});
			$.each(config.actions, function(i, action){
				widget.on(action.action,{container:widget}, function(event){
					alert('a');
				});
			});
		}
		let body = $("<div>",{class:"body"}).appendTo(widget);
		body.empty();
		$.each(config.elements, function(key, object){
			let layout = sectionsPath+object.name+"-"+object.style+".html";
			let element = $("<div>",{class:"element"}).appendTo(body);
			element.load(layout,function(){
				$(this).find("div [data]").each(function(){
					let d = $(this).attr("data");
					let c = $("."+d+"-container");
					let f = getFieldConfig(d);
					console.log(f);
					if(f!=null){
						if(f.type == 'multi'){
							let vs = getFieldValues(d);
							$.each(vs, function(k, ob){
								let r = $("<div>",{class:"r"+((k==0)?" last":"")+((f.hasdate ==1)?" hasdate":"")}).appendTo(c);
								let vc = $("<div>").appendTo(r);
								let vd = $("<div>").appendTo(r);
								let label = $("<div>",{class:"label"}).appendTo(vc).html(getFieldLabel(d));
								let value = $("<div>",{class:"value"}).appendTo(vc).html(renderFieldValue(d,ob));
								if(f.hasdate == 1){
									let labeldate = $("<div>",{class:"labeldate"}).appendTo(vd).html(getFieldLabelDate(d));
									let valuedate = $("<div>",{class:"valuedate"}).appendTo(vd).html(renderFieldValueDate(d,ob));
								}
							});
						}else if(f.type == 'single'){
							let vs = getFieldValues(d);
							if(f.iddata == 0){
								let label = $("<div>",{class:"label"}).appendTo(c).html(getFieldLabel(d));
								let value = $("<div>",{class:"value"}).appendTo(c).html(renderFieldValue(d, vs[0]));
							}
						}
					}else{
						let label = $("<div>",{class:"label"}).appendTo(c).text(getFieldLabel(d));
						let value = $("<div>",{class:"value"}).appendTo(c).text(renderFieldValue(d, eval('patientObj.'+d)));
					}
				});
			});
		});
		
		
	}
}