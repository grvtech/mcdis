import searchConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'
import GRVList from '/ncdis/js/component/grvlist.js'
import GRVInput from '/ncdis/js/component/grvinput.js'
import GRVDropdown from '/ncdis/js/component/grvdropdown.js'

export default class GRVsearch{
	
	/*
	 * properties is object format : {location, id, class, }
	 * location can be : page|header
	 * */
	constructor(){
		var view = page.view;
		this.config = eval("searchConfiguration."+view);
		//loadcss(this.config.css);
		this.elements = this.config.elements;
		this.container = $('.'+this.config.container);
		let c = $('<div>',{class:'grvsearch'}).appendTo(this.container);
		
		let listStyle = 'grvsearch-list';
		let listContainer = $('<div>',{class:listStyle}).appendTo(c);
		let inputContainer = $('<div>',{class:'grvsearch-input'}).appendTo(c);
		
		

		const id = 'search'+moment().unix();
		if(this.config.location == 'page'){
			const listProps = {'direction':'v', 'open':0, 'container': listStyle,'id':id+'Criteria'}
			this.list = GRVList(this.elements, listProps);
		}else{
			const listProps = {'container': listStyle,'id':id+'Criteria'}
			this.list = GRVDropdown(this.elements, listProps);
		}
		 
		const inputProps = {container:'grvsearch-input',id:id+'Input',style:'rightside',label:'Find patient'};
		this.input = GRVInput(inputProps);
		
			
		this.list.on('change','input',{object:this.input},function(event){
			event.data.object.find('input').val('');
			event.data.object.find('input').focus();
		});
	
		
		var optionSelected = false;
		var searchResult = [];
		$('.grvsearch-input input').autocomplete({
			delay: 300,
			minLength: 1,
			autoFocus: true,
			source: function( request, response ) {
				$.ajax({
					url: "/ncdis/service/data/searchPatient",
					dataType: "json",
					data: {
						criteria: $('#'+id+'Criteria').val(),
						term: $('#'+id+'Input').val(),
						language: "en",
						uuidsession: sid,
						action: 'search'
					},
					success: function( data ) {
						response($.map( data.elements.search, function( row ) {
							return {
								idpatient:row.idpatient,
								lastname:row.lastname,
								firstname : row.firstname,
								chart : row.chart,
								ramq : row.ramq,
								community: row.community,
								giu: row.giu,
								criteria : $('#'+id+'Criteria').val(),
								term : $('#'+id+'Input').val()
							}
						}));
					}
				});
			},
			select: function( event, ui ) {
				optionSelected = true;
				patientSearchObj = ui.item;
				console.log(patientSearchObj);
				//$.cookie('ramq',patientSearchObj.ramq);
				
				gtc(sid,"en",patientSearchObj.ramq,"dashboard");
				return false;
			},
			open: function() {
				optionSelected = false;
			},
			close: function() {
				if(!optionSelected){
		    		$("#ub_cdisbody").fadeTo( "fast", 1 );
		    	}
			}
		}).data("ui-autocomplete")._renderItem = function(ul,item) {
				//var $line = $("<a>");
				var $container = $("<div>",{class:'grvsearch-result-line'});
				
				if(item.criteria == "fnamelname"){
					var fn = (item.firstname+" "+item.lastname).toString().toLowerCase();
					fn = replaceAll(fn,item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
					$("<div>",{class:'searchname'}).appendTo($container).append($("<span>").html(fn.toUpperCase()));
				}else{
					$("<div>",{class:'searchname'}).appendTo($container).append($("<span>").html((item.firstname+" "+item.lastname).toUpperCase()));
				}
				$("<div>",{class:'searchcommunity'}).text(item.community).appendTo($container);
				if(item.criteria == "chart"){
					var cn = item.chart.toString();
					cn = replaceAll(cn,item.term, "<strong>"+item.term+"</strong>");
					$("<div>",{class:'searchchart'}).html("<span> "+cn+" </span>").appendTo($container);
				}else{
					$("<div>",{class:'searchchart'}).html("<span>[ "+item.chart+" ]</span>").appendTo($container);
				}
				if(item.criteria == "ramq"){
					var ran = (item.ramq).toString().toLowerCase();
					ran = replaceAll(ran, item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
					$("<div>",{class:'searchramq'}).html("<span>"+ran.toUpperCase()+"</span>").appendTo($container);
				}else{
					$("<div>",{class:'searchramq'}).html("<span>"+item.ramq+"</span>").appendTo($container);
				}
				
				if(item.criteria == "ipm"){
					var gan = (item.giu).toString().toLowerCase();
					gan = replaceAll(gan, item.term.toLowerCase(), "<strong>"+item.term.toLowerCase()+"</strong>");
					$("<div>",{class:'searchgiu'}).html("<span>"+gan.toUpperCase()+"</span>").appendTo($container);
				}else{
					$("<div>",{class:'searchgiu'}).html("<span>"+item.giu+"</span>").appendTo($container);
				}
				
				var $liline = $("<li>");
				$liline.append($container).appendTo(ul);
				$(ul).css("overflow-x","hidden");
				return $liline;
			};
	
		
		
	}
}