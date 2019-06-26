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
		
		this.elements = this.config.elements;
		this.container = $('.'+this.config.container);
		let listStyle = 'grv-search-list-'+this.config.location;
		let listContainer = $('<div>',{class:listStyle}).appendTo(this.container);
		let inputContainer = $('<div>',{class:'grv-search-input'}).appendTo(this.container);
		inputContainer.css('height','35px');
		const list = GRVList(this.elements, {'direction':'v', 'open':0, 'container': listStyle});
		
		const input = GRVInput({container:'grv-search-input',id:'myidinput',style:'classic',label:'Search for new patient'});
		
	}
}