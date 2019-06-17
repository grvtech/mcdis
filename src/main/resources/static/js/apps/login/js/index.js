import loginConfiguration from '../config.js'
import MessageRequest from '/ncdis/js/common/messagerequest.js'

export default class GRVlogin{
	constructor(){
		this.config = loginConfiguration;
		this.container = $('.'+this.config.container);
		loadcss(this.config.css);
	}
	
	render(){
		
		this.container.empty();
		this.container.hide();
		let wc = $('<div>',{class:'container'}).appendTo(this.container);
		
		$('<div>',{class:'row'}).append($('<div>',{class:'cell index-cdistext'}).text('Cree Diabetes Information System')).appendTo(wc);
		//$('<div>',{class:'index-cdistext'}).text('Cree Diabetes Information System').appendTo(this.container);
		this.form = $('<form>',{class:'index-login container'}).appendTo(wc);
		let r1 = $('<div>',{class:'row'}).appendTo(this.form);
		$('<div>',{class:'index-avatar col-3'}).appendTo(r1);
		let c2 = $('<div>',{class:'col-6'}).appendTo(r1);
		
		$('<div>',{class:'index-username'}).append($('<input>',{type:'text',name:'user',id:'user',class:'form-control', placeholder:'Username',tabindex:1}).focus()).appendTo(c2);
		$('<div>',{class:'index-password'}).append($('<input>',{type:'password',name:'pass',id:'pass',class:'form-control', placeholder:'Password',tabindex:2}).on('keyup',function(e){if(e.keyCode == 13){$("#loginbutton").click();}})).appendTo(c2);
		
		//$('<div>',{class:'common-error', id:'errorText'}).appendTo(this.form);
		
		let c3 = $('<div>',{class:'col-3'}).appendTo(r1);
		this.lb = $('<div>',{class:'btn btn-primary index-login-button', id:'loginButton', tabindex:3}).text('Login').appendTo(c3);
		
		let r2 = $('<div>',{class:'row'}).appendTo(this.form);
		
		this.fb = $('<div>',{class:'btn btn-primary index-forgot-button', id:'forgotButton'}).text('Forgot password').appendTo($('<div>',{class:'col center'}).appendTo(r2));
		this.sb = $('<div>',{class:'btn btn-primary index-subscribe-button', id:'subscribeButton'}).text('Add new CDIS user').appendTo($('<div>',{class:'col align-items-center'}).appendTo(r2));
		
		this.lb.on('click',{action:this.config.actions.login},this.l);
		this.fb.on('click',this.f);
		this.sb.on('click',this.s);
		this.container.fadeIn(1000);
		this.buildForgotDialog();
		this.buildSubscribeDialog();
	}

	
	buildForgotDialog(){
		var body = $('body');
		var imsg ='All form fields are required.';
		var df = $('<div>',{class:'index-dialog-forgot', title:'Entrer info to recover passord', id:'dialogForgot'}).appendTo(body);
		$('<p>',{class:'validate-tips'}).text('All form fields are required.').appendTo(df);
		var fs = $('<fieldset>').appendTo($('<form>').appendTo(df));
		$('<label>',{for:'usernameUser'}).text('User name').appendTo(fs);
		$('<input>',{type:'text',name:'usernameUser',id:'usernameUser',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'firstnameUser'}).text('First name').appendTo(fs);
		$('<input>',{type:'text',name:'firstnameUser',id:'firstnameUser',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'lastnameUser'}).text('Last name').appendTo(fs);
		$('<input>',{type:'text',name:'lastnameUser',id:'lastnameUser',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'emailUser'}).text('Email').appendTo(fs);
		$('<input>',{type:'text',name:'emailUser',id:'emailUser',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'profesionUser'}).text('Profession').appendTo(fs);
		$('<select>',{name:'profesionUser',id:'profesionUser',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		var ops = ['Please Choose','CHR', 'MD', 'Nurse', 'Nutritionist'];
		for(let i=0;i<ops.length;i++){
			$('<option>',{value:i}).text(ops[i]).appendTo($('#profesionUser'));
		}
		df.dialog({autoOpen: false,resizable: false,height: 650,width: 420,modal: true,
		    buttons: {
		    	Cancel: function() {$( this ).dialog( "close" );},
		    	"Recover Password": function() {GRVlogin.forgot();}},
		    	close: function() {$('#dialogForgot form')[0].reset();$(".mf").removeClass( "ui-state-error" );$('.validate-tips').text(imsg);}
		});
		$('.ui-dialog-buttonpane button').addClass('btn btn-primary');
	}
	
	
	buildSubscribeDialog(){
		var body = $('body');
		var imsg = 'All form fields are required.';
		var df = $('<div>',{class:'index-dialog-subscribe', title:'Subscribe to CDIS', id:'dialogSubscribe'}).appendTo(body);
		$('<p>',{class:'validate-tips'}).text(imsg).appendTo(df);
		var fs = $('<fieldset>').appendTo($('<form>').appendTo(df));
		$('<label>',{for:'firstnameSub'}).text('First name').appendTo(fs);
		$('<input>',{type:'text',name:'firstnameSub',id:'firstnameSub',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'lastnameSub'}).text('Last name').appendTo(fs);
		$('<input>',{type:'text',name:'lastnameSub',id:'lastnameSub',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'emailSub'}).text('Email').appendTo(fs);
		$('<input>',{type:'text',name:'emailSub',id:'emailSub',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		$('<label>',{for:'idcommunitySub'}).text('Community').appendTo(fs);
		$('<select>',{name:'idcommunitySub',id:'idcommunitySub',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		var ops = ['Please Choose','Chisasibi','Estmain','Mistissini','Nemaska','Oujebougoumou','Waskaganish','Waswanipi','Wemindji','Whapmagoostui'];
		for(let i=0;i<ops.length;i++){
			$('<option>',{value:i}).text(ops[i]).appendTo($('#idcommunitySub'));
		}
		$('<label>',{for:'idprofesionSub'}).text('Profession').appendTo(fs);
		$('<select>',{name:'idprofesionSub',id:'idprofesionSub',class:'text ui-widget-content ui-corner-all mf'}).appendTo(fs);
		var ops = ['Please Choose','CHR', 'MD', 'Nurse', 'Nutritionist'];
		for(let i=0;i<ops.length;i++){
			$('<option>',{value:i}).text(ops[i]).appendTo($('#idprofesionSub'));
		}
		df.dialog({autoOpen: false,resizable: false,height: 650,width: 420,modal: true,
		    buttons: {
		    	Cancel: function() {$( this ).dialog( "close" );},
		    	"Recover Password": function() {GRVlogin.forgot($('#dialogForgot form'));}},
		    	close: function() {$('#dialogForgot form')[0].reset();$(".mf").removeClass( "ui-state-error" );$('.validate-tips').text(imsg);}
		  });
		
		df.dialog({autoOpen: false,resizable: false,height: 650,width: 420,modal: true,
		  buttons: {
		    Cancel: function() {$( this ).dialog( "close" );},
		    "Subscribe to CDIS": function() {GRVlogin.subscribe();}},
		  close: function() {$('#dialogForgot form')[0].reset();$(".mf").removeClass( "ui-state-error" );}
		});
		$('.ui-dialog-buttonpane button').addClass('btn btn-primary');
	}
	
	/*forgot password click action*/
	f(event){$("#dialogForgot").dialog("open");}
	
	/*subscribe click action*/
	s(event){$("#dialogSubscribe").dialog("open");}
	
	/*login method*/
	l(event){
		var user = $("#user").val();var pass = $("#pass").val();var error = $("#errorText");var validUser = Validate.now(Validate.Presence, $("#user").val());var validPass = Validate.now(Validate.Presence, $("#pass").val());
		if(validUser && validPass){
			var data = {'elements':{'username':user, 'password':pass, 'reswidth':$(window).width(), 'resheight':$(window).height()} , 'uuidsession': emptySession, 'action':'gol'};
			var request = $.ajax({url:event.data.action,type: "post",dataType: "json",contentType: 'application/json',data : JSON.stringify(data)});
			request.done(function( json ) {if(json.status == "error"){error.text(json.elements.message);}else{userObj = json.elements.user;sid = json.uuidsession;gts(sid,"en");}});
			request.fail(function( jqXHR, textStatus ) {error.text("Wrong Username or Password");});
		}else{
			error.text("Username or Password cannot be empty");
		}
	}
	
	
	/*forgot password send action*/
	static forgot(){
		    var valid = true;
		    $(".mf").removeClass( "ui-state-error" );
		    valid = valid && GRVlogin.checkLength($( "#usernameUser" ), "Username" );
		    valid = valid && GRVlogin.checkLength(  $( "#firstnameUser" ), "First name" );
		    valid = valid && GRVlogin.checkLength(  $( "#lastnameUser" ), "Last name" );
		    valid = valid && GRVlogin.checkLength(  $( "#emailUser" ), "Email" );
		    valid = valid && GRVlogin.checkLength(  $( "#profesionUser" ), "Profession" );
		    valid = valid && GRVlogin.checkRegexp(  $( "#emailUser" ), emailRegex, "eg. name@domain.com" );

		    if ( valid ) {
		    	var mes = $.ajax({
		    		  url: "/ncdis/service/action/forgotPassword?language=en&firstnameUser="+$("#firstnameUser").val()+"&lastnameUser="+$("#lastnameUser").val()+"&usernameUser="+$("#usernameUser").val()+"&emailUser="+$("#emailUser").val()+"&profesionUser="+$("#profesionUser").val(),
		    		  type: "GET",
		    		  async : false,
		    		  cache : false,
		    		  dataType: "json"
		    		});
		    		mes.done(function( json ) {
		    			var tips = $('.validate-tips');
		    			if(json.status == "1"){tips.html(json.message);
		    			}else{tips.html(json.message);}
		    		});
		    		mes.fail(function( jqXHR, textStatus ) {
		    		  alert( "Error sending message : " + textStatus );
		    		  $("#dialogForgot form")[ 0 ].reset();
		  			  $("#dialogForgot").dialog( "close" );
		    		});	

		    }
		    return valid;
	}

	/*subscribe send action*/
	static subscribe(){
		var valid = true;
		$(".mf").removeClass( "ui-state-error" );
		valid = valid && GRVlogin.checkLength(  $( "#firstnameSub" ), "First name" );
		valid = valid && GRVlogin.checkLength(  $( "#lastnameSub" ), "Last name" );
		valid = valid && GRVlogin.checkLength(  $( "#emailSub" ), "Email" );
		valid = valid && GRVlogin.checkLength(  $( "#idcommunitySub" ), "User Community" );
		valid = valid && GRVlogin.checkLength(  $( "#idprofesionSub" ), "Profession" );
		valid = valid && GRVlogin.checkRegexp(  $( "#emailSub" ), emailRegex, "Email format should be : eg. name@domain.com" );

	    if ( valid ) {
	    	var mes = $.ajax({
	    		  url: "/ncdis/service/action/subscribe?language=en&firstnameSub="+$("#firstnameSub").val()+"&lastnameSub="+$("#lastnameSub").val()+"&idcommunitySub="+$("#idcommunitySub").val()+"&emailSub="+$("#emailSub").val()+"&idprofesionSub="+$("#idprofesionSub").val(),
	    		  type: "GET",
	    		  async : false,
	    		  cache : false,
	    		  dataType: "json"
	    		});
	    		mes.done(function( json ) {
	    			console.log(json);
	    			if(json.status == "1"){
	    				tips.html(json.message);
	    				$("#dialog-subscribe").find("fieldset").hide();
	    			}else{
	    				tips.html(json.message);
	    			}
	    		});
	    		mes.fail(function( jqXHR, textStatus ) {
	    		  alert( "Error sending message : " + textStatus );
	    		  formSubscribe[ 0 ].reset();
	  			  $("#dialog-subscribe").dialog( "close" );
	    		});	
	    }
	    return valid;
	}
	
	
	static updateTips( t ) {
		var tips = $('.validate-tips');
	    tips.text( t ).addClass( "ui-state-highlight" );
	    setTimeout(function() {tips.removeClass( "ui-state-highlight", 1500 );}, 500 );
	  }

	static checkLength( o, n ) {
	    if ( o.val().length == 0 || o.val() == '0') {
	      o.addClass( "ui-state-error" );
	      GRVlogin.updateTips( "Field " + n + " cannot be empty." );
	      return false;
	    } else {
	      return true;
	    }
	  }

	static checkRegexp( o, regexp, n ) {
	    if ( !( regexp.test( o.val() ) ) ) {
	      o.addClass( "ui-state-error" );
	      GRVlogin.updateTips( n );
	      return false;
	    } else {
	      return true;
	    }
	  }

	
	
	/*
	 * 
	 * <div class="index-cdistext">Cree Diabetes Information System</div>
				<form id="loginform" class="index-login">
					<div class="index-avatar"></div>
					<div id="errorText" class="common-error"></div>
					<div class="index-username">
						<input type="text" name="user" id="user" class="form-control" placeholder="Username" tabindex="1"/>
					</div>
					<div class="index-password">
						<input type="password" id="pass" name="pass" class="form-control" placeholder="Password" tabindex="2"/>
					</div>
					<div id="loginButton" class="btn btn-primary index-login-button" tabindex="3">Login</div>
					
					<div class="btn btn-primary index-forgot-button" id="forgotButton">Forgot password?</div>
					<div class="btn btn-primary index-subscribe-button" id="subscribeButton">Add new CDIS user</div>
				</form>
	 * */
	
	
	
	
	/*
	
		this.container = $(object.container);
		this.loginContainer = $('<div>',{class:'grv grv-login-container shadow border'}).appendTo(this.container);
		this.loginWidget = $('<div>',{class:'grv-widget grv-login',id:'loginWidget'}).appendTo(this.loginContainer);
		
		Survey.StylesManager.applyTheme("bootstrap");
		var loginForm = new Survey.Model(object.surveyLogin);
		loginForm.showQuestionNumbers = 'off';
		loginForm.showCompletedPage = true;
		loginForm.completedHtml = "Logging in...";
		loginForm.requiredText = '';
		loginForm.locale = pageLanguage;
		pageForms.push(loginForm);
		$(this.loginWidget).Survey({model:loginForm,onServerValidateQuestions : function(survey,options){
			var mr = new GRVMessageRequest(survey.data,'login',emptysession,0);
			//call the ajax method
		    $.ajax({
		    	url: pageObject.origin+object.actions.login,
		    	type: 'post',
		        dataType: 'json',
		        contentType: 'application/json',
		        data: JSON.stringify(mr)
		    }).then(function (data) {
				var mresp = new GRVMessageResponse(data);
				if (mresp.status == "error"){
					localiseObject(mresp);
					options.errors = mresp.elements.error;
				}else{
					//tell survey that we are done with the server validation
					if (storageAvailable('sessionStorage')) {
						  // Yippee! We can use sessionStorage awesomeness
						var login = {};
						login['timestamp'] = moment().format('YYYY-MM-DD HH:mm:ss');
						login['user'] = mresp.elements.uuiduser;
						login['session'] = mresp.elements.uuidsession;
						
						options['login'] = login;
						options['next'] = object.actions.loginsuccess;
						options['prev'] = '/index';
					}
					else {
					  // Too bad, no localStorage for us
						console.log("no local storage");
					}
				}
				//options.complete();
			});
		},onComplete:function(survey,options){
			gtu(options);
		}});
			
		this.subscribeWidget = $('<div>',{class:'grv-widget grv-subscribe',id:'subscribeWidget'}).appendTo(this.loginContainer);
		this.subscribeButton = $('<div>',{class:'btn btn-secondary'}).text('i18n:subscribe_btn').appendTo(this.subscribeWidget);
		this.forgotWidget = $('<div>',{class:'grv-widget grv-forgot',id:'forgotWidget'}).appendTo(this.loginContainer);
		this.forgotButton = $('<div>',{class:'btn btn-secondary'}).text('i18n:forgot_btn').appendTo(this.forgotWidget);
		
		
		
		
		this.subscribeButton.click({param1:object},function(event){
			var target = $(event.data.param1.subscribeTarget);
			//hide all grv containers in container
			target.find('.grv').hide();
			//remove all subscribe or forgot widgets
			$('.grv-subscribe-container').remove();
			$('.grv-forgot-container').remove();
			var subscribeFormContainer = $('<div>',{class:'grv grv-subscribe-container shadow border'}).appendTo(target);
			
			Survey.StylesManager.applyTheme("bootstrap");
			var subscribeForm = new Survey.Model(object.surveySubscribe);
			subscribeForm.showQuestionNumbers = 'off';
			subscribeForm.showCompletedPage = true;
			
			subscribeForm.requiredText = '';
			subscribeForm.locale = pageLanguage;
			subscribeForm.completedHtml = "Logging in..."
			pageForms.push(subscribeForm);
			
			subscribeFormContainer.Survey({model:subscribeForm,onServerValidateQuestions:function(survey,options){
				var url = getPageObject();
				var mr = new GRVMessageRequest(survey.data,'subscribe','',true);
				//call the ajax method
			    $.ajax({
	    			url: url.origin+"/login/subscribe",
	    			type: 'post',
	                dataType: 'json',
	                contentType: 'application/json',
	                data: JSON.stringify(mr)
	    		}).then(function (data) {
			            var mresp = new GRVMessageResponse(data);
			            if (mresp.status == "error"){
			            	localiseObject(mresp);
			            	options.errors = mresp.elements.error;
			            }else{
			            	
			            }
			            //tell survey that we are done with the server validation
			            options.complete();
			       });
			},onComplete:function(survey,options){
				//window.location = "/user";
			}});

			var subscribeCancel = $('<div>',{class:'btn btn-secondary'}).text('i18n:cancel_btn').insertBefore($('.grv-subscribe-container .sv_complete_btn'));
			subscribeCancel.click({target:target},function(event){
				$('.grv-subscribe-container').remove();
				event.data.target.find('.grv').show();
			});
			
			deployLanguage(subscribeFormContainer);
		});
		
		
		
		this.forgotButton.click({param1:object},function(event){
			var target = $(event.data.param1.subscribeTarget);
			//hide all grv containers in container
			target.find('.grv').hide();
			//remove all subscribe or forgot widgets
			$('.grv-subscribe-container').remove();
			$('.grv-forgot-container').remove();
			var forgotFormContainer = $('<div>',{class:'grv grv-forgot-container shadow border'}).appendTo(target);
			Survey.StylesManager.applyTheme("bootstrap");
			var forgotForm = new Survey.Model(event.data.param1.surveyForgot);
			forgotForm.showQuestionNumbers = 'off';
			forgotForm.showCompletedPage = true;
			forgotForm.requiredText = '';
			forgotForm.locale = pageLanguage;
			pageForms.push(forgotForm);
			forgotFormContainer.Survey({model:forgotForm});
			var forgotCancel = $('<div>',{class:'btn btn-secondary'}).text('i18n:cancel_btn').insertBefore($('.grv-forgot-container .sv_complete_btn'));
			forgotCancel.click({target:target},function(event){
				$('.grv-forgot-container').remove();
				event.data.target.find('.grv').show();
			});
			
			
			forgotForm.onComplete.add(function(survey,options){
				var resultAsString = JSON.stringify(survey.data);
				alert(resultAsString);
				
				/*
				var mr = new GRVMessageRequest(survey.data,true);
				console.log(mr);
				var xhr = new XMLHttpRequest();
			    xhr.open("POST", "http://localhost:8090/login", true);
			    xhr.setRequestHeader("Content-Type", "application/json");
			    var dataStringify = JSON.stringify(mr);
			    xhr.onreadystatechange = function () {
			        if (xhr.readyState === 4 && xhr.status === 200) {
			            var json = JSON.parse(xhr.responseText);
			            console.log(json);
			        }
			    };
			    xhr.send(dataStringify);
			    */
		/*	 });
			
			deployLanguage(forgotFormContainer);
		});
		
		setTimeout(deployLanguage, 1);
		
		
		this.test = function(){
			alert('radu');
		}
		*/
}

