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
		$('<div>',{class:'index-cdistext'}).text('Cree Diabetes Information System').appendTo(this.container);
		this.form = $('<form>',{class:'index-login'}).appendTo(this.container);
		$('<div>',{class:'index-avatar'}).appendTo(this.form);
		$('<div>',{class:'common-error', id:'errorText'}).appendTo(this.form);
		$('<div>',{class:'index-username'}).append($('<input>',{type:'text',name:'user',id:'user',class:'form-control', placeholder:'Username',tabindex:1}).focus()).appendTo(this.form);
		$('<div>',{class:'index-password'}).append($('<input>',{type:'password',name:'pass',id:'pass',class:'form-control', placeholder:'Password',tabindex:2}).on('keyup',function(e){if(e.keyCode == 13){$("#loginbutton").click();}})).appendTo(this.form);
		this.lb = $('<div>',{class:'btn btn-primary index-login-button', id:'loginButton', tabindex:3}).text('Login').appendTo(this.form);
		this.fb = $('<div>',{class:'btn btn-primary index-forgot-button', id:'forgotButton'}).text('Forgot password').appendTo(this.form);
		this.sb = $('<div>',{class:'btn btn-primary index-subscribe-button', id:'subscribeButton'}).text('Add new CDIS user').appendTo(this.form);
		this.lb.on('click',{action:this.config.actions.login},this.l);
		this.lb.on('click',this.f);
		
		var df = $('<div>',{class:'index-dialog-forgot', title:'Entrer info to recover passord', id:'dialogForgot'}).appendTo($('body'));
		this.container.fadeIn(1000);
	}

	f(event){
		
		$("#dialogForgot").dialog({
			  autoOpen: false,
		    	resizable: false,
		    	height: 650,
		   		width: 420,
		    	modal: true,
		    buttons: {
		      Cancel: function() {
		        $( this ).dialog( "close" );
		      },
		      "Recover Password": function() {
		    	  forgotPassword(formForgot[0]);
		        }
		    },
		    close: function() {
		        formForgot[ 0 ].reset();
		        $(".mf").removeClass( "ui-state-error" );
		        tips.text(imsg);
		      }
		  });

		
		<div id="dialogForgot" title="Forgot Password ? Enter info to recover password." class="index-dialog-forgot">
		  <p class="validateTips">All form fields are required.</p>
		   <form>
		    <fieldset>
		      <label for="usernameUser">Username</label>
		      <input type="text" name="usernameUser" id="usernameUser" value="" class="text ui-widget-content ui-corner-all mf">
		      <label for="firstnameUser">First name</label>
		      <input type="text" name="firstnameUser" id="firstnameUser" value="" class="text ui-widget-content ui-corner-all mf">
		      <label for="nameUser">Last name</label>
		      <input type="text" name="lastnameUser" id="lastnameUser" value="" class="text ui-widget-content ui-corner-all mf">
		      <label for="emailUser">Email</label>
		      <input type="text" name="emailUser" id="emailUser" value="" class="text ui-widget-content ui-corner-all mf">
		 	  <label for="profesionUser">Profession</label>
		      <select name="profesionUser" id="profesionUser" class="text ui-widget-content ui-corner-all mf">
		      	<option value="0">Please Choose ...</option>
		      	<option value="1">CHR</option>
		      	<option value="2">MD</option>
		      	<option value="3">Nurse</option>
		      	<option value="3">Nutritionist</option>
		      </select>
		      
		      <!-- Allow form submission with keyboard without duplicating the dialog button -->
		      <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
		    </fieldset>
		  </form>
	</div>

		
		
	}
	
	
	/*login method*/
	l(event){
		var user = $("#user").val();
		var pass = $("#pass").val();
		var error = $("#errorText");
		var validUser = Validate.now(Validate.Presence, $("#user").val());
		var validPass = Validate.now(Validate.Presence, $("#pass").val());
		if(validUser && validPass){
			var data = {'elements':{'username':user, 'password':pass, 'reswidth':$(window).width(), 'resheight':$(window).height()} , 'uuidsession': emptySession, 'action':'gol'};
			var request = $.ajax({url:event.data.action,type: "post",dataType: "json",contentType: 'application/json',data : JSON.stringify(data)});
			request.done(function( json ) {if(json.status == "error"){error.text(json.elements.message);}else{userObj = json.elements.user;sid = json.uuidsession;gts(sid,"en");}});
			request.fail(function( jqXHR, textStatus ) {error.text("Wrong Username or Password");});
		}else{
			error.text("Username or Password cannot be empty");
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

