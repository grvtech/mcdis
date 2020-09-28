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
				/*
				 * here I check the condition
				 * */
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
			});
		});
		
	let evaluateCondition = function(value, condition){
		console.log('evaluate condition');
		console.log(value+'-------'+condition);
		let result = [];
		if(value.indexOf('_or_') >= 0){
			if(condition == 'last'){
				let vs = value.split('_or_');
				let vresult = "";
				let vdate = 0;
				$.each(vs, function(i, v){
					var d1 = getLastDate(v);
					if(d1 > vdate){
						vresult = v;
					}
				});
				if(vresult != ""){
					result.push(vresult);
				}
			}
		}else if(value.indexOf('_and_') >= 0 ){
			//result = value.split('_and_');
			result.push(value);
		}
		console.log(result);
		console.log('evaluate condition end');
		
		return result;
	}	
	
	let getLastDate = function(value){
		let vs = getFieldValues(value);
		if(typeof(vs) == 'Array')
			return vs[0].date;
		else
			return 0;
	}
	
	let renderElement = function(value,object){
		
		console.log("object type");
		console.log(typeof(object.condition) +"    "+value);
		/*
		 * if there is a condition we have to apply the condition rule
		 * */
		let f = getFieldConfig(value);
		let c = $("."+value+"-container");
		if(f!=null){
			if(f.type == 'multi'){renderMulti(c,value,object);}
			else if(f.type == 'single'){renderSingle(c,value,object);}
			else if(f.type == 'graph'){renderGraph(c,value,object);}
		}else{renderSimple(c,value,object);}
	}
	
	let renderSimple = function(container, value, object){
		$("<div>",{class:"label"}).appendTo(container).text(getFieldLabel(value));
		console.log('-----------'+value);
		console.log(container);
		console.log(object);
		$("<div>",{class:"value"}).appendTo(container).text(renderFieldValue(value, eval('patientObj.'+value)));
	}
	
	
	let renderNoData = function(object){
		var c = $('.'+object.name+'-default');
		$("<div>",{class:"label"}).appendTo(c).text(getFieldLabel('nodata'));
	}
	
	let renderSingle = function(container, value, object){
		let vs = getFieldValues(value);
		let f = getFieldConfig(value);
		if(f.iddata == 0){
			$("<div>",{class:"label"}).appendTo(container).html(getFieldLabel(value));
			$("<div>",{class:"value"}).appendTo(container).html(renderFieldValue(value, vs[0]));
		}
	}
	
	let renderMulti = function(container, value, object){
		let f = getFieldConfig(value);
		let vs = getFieldValues(value);
		$.each(vs, function(k, ob){
			let r = $("<div>",{class:"r"+((k==0)?" last":"")+((f.hasdate ==1)?" hasdate":"")}).appendTo(container);
			let vc = $("<div>").appendTo(r);
			let vd = $("<div>").appendTo(r);
			$("<div>",{class:"label"}).appendTo(vc).html(getFieldLabel(value));
			$("<div>",{class:"value"}).appendTo(vc).html(renderFieldValue(value,ob));
			if(f.hasdate == 1){
				$("<div>",{class:"labeldate"}).appendTo(vd).html(getFieldLabelDate(value));
				$("<div>",{class:"valuedate"}).appendTo(vd).html(renderFieldValueDate(value,ob));
			}
		});
	}
	
	
	let renderGraph = function(container, value, object){
		let f = getFieldConfig(value);
		let vs = getFieldValues(value);
		console.log("the data name is :"+value);
		console.log(object);
		let menus = object.menu;
		if(menus.length > 0){
			let menucontainer = $(container).find('.menu-container');
			console.log(menucontainer);
			$.each(menus, function(i, item){
				let mi = $("<div>",{class:"menu-item"}).appendTo(menucontainer).html(item.label);
				
			});

		}
	}
	
}