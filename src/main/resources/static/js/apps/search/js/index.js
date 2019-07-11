import searchConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'
import GRVList from '/ncdis/js/component/grvlist.js'
import GRVInput from '/ncdis/js/component/grvinput.js'

export default class GRVsearch{
	
	/*
	 * properties is object format : {location, id, class, }
	 * location can be : page|header
	 * */
	constructor(){
		var view = page.view;
		this.config = eval("searchConfiguration."+view);
		loadcss(this.config.css);
		this.elements = this.config.elements;
		this.container = $('.'+this.config.container);
		this.container.addClass('grv-search');
		let listStyle = 'grv-search-list-'+this.config.location;
		let listContainer = $('<div>',{class:listStyle}).appendTo(this.container);
		let inputContainer = $('<div>',{class:'grv-search-input'}).appendTo(this.container);
		//inputContainer.css('height','35px');
		const listProps = {'direction':'v', 'open':0, 'container': listStyle,'id':'myidlist'}
		const list = GRVList(this.elements, listProps);
		
		 
		const inputProps = {container:'grv-search-input',id:'myidinput',style:'rightside',label:'Find patient',height:50, width:'100%'};
		const input = GRVInput(inputProps);
		
		
		
		
		var optionSelected = false;
		var searchResult = [];
		$('.grv-search-input input').autocomplete({
			delay: 300,
			minLength: 2,
			autoFocus: true,
			source: function( request, response ) {
				$.ajax({
					url: "/ncdis/service/data/searchPatient",
					dataType: "json",
					data: {
						criteria: $(list).find('input').val(),
						term: input.find('input').val(),
						language: "en",
						uuidsession: sid,
						action: 'search'
					},
					success: function( data ) {
						console.log(data);
						response($.map( data.elements.search, function( row ) {
							//console.log('array element');
							//console.log(row);
							return {
								idpatient:row.idpatient,
								lastname:row.lastname,
								firstname : row.firstname,
								chart : row.chart,
								ramq : row.ramq,
								community: row.community,
								giu: row.giu,
								criteria : $(list).find('input').val(),
								term : $(input).find('input').val()
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
				
				//console.log("item");
				console.log(item);
				
				/**/
				//var $line = $("<a>");
				var $container = $("<div>");
				//$line.height("95px");
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
					//console.log(cn);
					cn = replaceAll(cn,item.term, "<strong>"+item.term+"</strong>");
					//$("<div>",{class:'searchchart'}).html("<label>Chart Number :</label> <span>"+cn+"</span>").appendTo($container);
					$("<div>",{class:'searchchart'}).html("<span> "+cn+" </span>").appendTo($container);
				}else{
					//$("<div>",{class:'searchchart'}).html("<label>Chart Number :</label> <span>"+item.chart+"</span>").appendTo($container);
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
				
				//var $line = $("<div>").text(item.chart);
				var $liline = $("<li>");
				//$liline.height("35px");
				$liline.append($container).appendTo(ul);
				$(ul).css("overflow-x","hidden");
				return $liline;
			};
		
		
		
	}
}