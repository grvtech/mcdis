/*
 * MAIN
 * */


var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
name = $( "#nameUser" ),
email = $( "#emailUser" ),
message = $( "#messageUser" ),
admin = $("#adminUser"),
tips = $( ".validateTips" );
var imsg = "All form fields are required.";

$("#user").focus();


$("#forgotButton").click(function (){
	$("#dialogForgot").dialog("open");
});

$("#subscribeButton").click(function (){
	$("#dialogSubscribe").dialog("open");
});


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


$("#dialogSubscribe").dialog({
	  autoOpen: false,
  resizable: false,
  height: 650,
  width: 420,
  modal: true,
  buttons: {
    Cancel: function() {
      $( this ).dialog( "close" );
      
    },
    "Subscribe to CDIS": function() {
  	 	subscribe();
      }
  },
  close: function() {
      formSubscribe[ 0 ].reset();
      $(".mf").removeClass( "ui-state-error" );
    }
});




var formForgot = $("#dialogForgot").find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    forgotPassword();
  });
  
var formSubscribe = $("#dialogSubscribe").find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    subscribe();
    //sendUserMessage();
  });


/*
var mes = $.ajax({
	  url: "/ncdis/service/action/getFrontPageMessage?language=en",
	  type: "GET",
	  async : false,
	  cache : false,
	  dataType: "json"
	});
	mes.done(function( json ) {
		message = json.objs[0].message;
		if(message != ""){
			$("#frontpage").html(message); 
			var contents = $("#frontpage").wrapInner('<div>').children(); // wrap a div around the contents
			var height = contents.outerHeight();
			$("#frontpage").animate({ scrollTop: height }, 8000);
			setTimeout(function() {$("#frontpage").animate({scrollTop:0}, 8000);},8000);
			setInterval(function(){
	     		$("#frontpage").animate({ scrollTop: height }, 8000);
				setTimeout(function() {
	   						$("#frontpage").animate({scrollTop:0}, 8000); 
							},8000);
			},16000);
		}else{
			$("#frontpage").hide();
		}
				
	});
	mes.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	  console.log(this.url);
	});	

	
	$('#loginbutton').bind('keypress', function(e) {
		if(e.keyCode==13){
			$(this).click();
		}
	});

*/




$("#loginButton").click(function() {
	
	
	var user = $("#user").val();
	var pass = $("#pass").val();
	var validUser = Validate.now(Validate.Presence, $("#user").val());
	var validPass = Validate.now(Validate.Presence, $("#pass").val());
	
	
	
	if(validUser && validPass){
		
		var data = {'elements':{'username':user, 'password':pass} , 'uuidsession': emptySession, 'action':'gol'};
		
		
		var request = $.ajax({
		  url: "/ncdis/user/authenticate",
		  type: "post",
		  dataType: "json",
		  contentType: 'application/json',
		  data : JSON.stringify(data)
		});
		request.done(function( json ) {
			
			console.log(json);
			
		  if(json.status == "error"){
			  $("#errorText").text(json.elements.message);
		  }else{
			 //userObj = json.objs[0];
			 userObj = json.elements.user;
			 sid = getSession(userObj.iduser);
			 var ramq = $.cookie('ramq');
			 if((ramq != null) && (ramq != "")){
				 //window.location = "cdis.html?section=patient&ramq="+ramq+"&sid="+sid+"&language=en";
				 //window.location = "search.html?sid="+sid+"&language=en";
				 gts(sid,"en");
				 //gtc(sid,"en",ramq,"patient");
			 }else{
				 //startUser();
				 //window.location = "search.html?sid="+sid+"&language=en";
				 gts(sid,"en");
			 }
		  }
		});
		request.fail(function( jqXHR, textStatus ) {
			$("#errorText").text("Wrong Username or Password");
		});
		
	}else{
		$("#errorText").text("Username or Password cannot be empty");
		
	}
});

$("#pass").keyup(function(e){
	if(e.keyCode == 13){
		$("#loginbutton").click();
	}
});




/*
 * FUNCTIONS
 * 
 * */


function forgotPassword() {
    var valid = true;
    $(".mf").removeClass( "ui-state-error" );
    valid = valid && checkLength(  $( "#usernameUser" ), "Username" );
    valid = valid && checkLength(  $( "#firstnameUser" ), "First name" );
    valid = valid && checkLength(  $( "#lastnameUser" ), "Last name" );
    valid = valid && checkLength(  $( "#emailUser" ), "Email" );
    valid = valid && checkLength(  $( "#profesionUser" ), "Profession" );
    valid = valid && checkRegexp(  $( "#emailUser" ), emailRegex, "eg. name@domain.com" );


    if ( valid ) {
    	var mes = $.ajax({
    		  url: "/ncdis/service/action/forgotPassword?language=en&firstnameUser="+$("#firstnameUser").val()+"&lastnameUser="+$("#lastnameUser").val()+"&usernameUser="+$("#usernameUser").val()+"&emailUser="+$("#emailUser").val()+"&profesionUser="+$("#profesionUser").val(),
    		  type: "GET",
    		  async : false,
    		  cache : false,
    		  dataType: "json"
    		});
    		mes.done(function( json ) {
    			console.log(json);
    			if(json.status == "1"){
    				tips.html(json.message);
    				$("#subform").hide();
    			}else{
    				tips.html(json.message);
    			}
    		});
    		mes.fail(function( jqXHR, textStatus ) {
    		  alert( "Error sending message : " + textStatus );
    		  console.log(this.url);
    		  formForgot[ 0 ].reset();
  			  $("#dialog-forgot").dialog( "close" );
    		});	

    }
    return valid;
  }

function subscribe() {
    var valid = true;
    $(".mf").removeClass( "ui-state-error" );
    valid = valid && checkLength(  $( "#firstnameSub" ), "First name" );
    valid = valid && checkLength(  $( "#lastnameSub" ), "Last name" );
    valid = valid && checkLength(  $( "#emailSub" ), "Email" );
    valid = valid && checkLength(  $( "#idcommunitySub" ), "User Community" );
    valid = valid && checkLength(  $( "#idprofesionSub" ), "Profession" );
    valid = valid && checkRegexp(  $( "#emailSub" ), emailRegex, "Email format should be : eg. name@domain.com" );


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


function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }

  function checkLength( o, n ) {
    if ( o.val().length == 0 || o.val() == '0') {
      o.addClass( "ui-state-error" );
      updateTips( "Field " + n + " cannot be empty." );
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }

