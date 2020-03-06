


function getSortedKeys(obj){
	var result = [];
	if(obj != null ){
		var keys = Object.keys(obj);
		//result.push(keys[0]);
		for(var j=0;j<keys.length;j++){
			var kk = eval("obj."+keys[j]);
			if(kk != null){
				var ind = kk.values[0].order;
				var l = result.length;
				var add = true;
				for(var k=0;k<l;k++){
					var vk = eval("obj."+result[k]);
					var v = vk.values[0].order;
					if(ind <= v){
						result.splice(k,0,keys[j]);
						add=false;
						break;
					}
				}
				if(add){
					result.push(keys[j]);
				}
			}
		}
	}
	return result;
}


/* tooltip function*/
//Use a closure to keep vars out of global scope
/*
(function () {
var ID = "tooltip_cdis", CLS_ON = "tooltip_ON", FOLLOW = true,
DATA = "_tooltip", OFFSET_X = 20, OFFSET_Y = 10,
showAt = function (e) {
    var ntop = e.pageY + OFFSET_Y, nleft = e.pageX + OFFSET_X;
	  //var ntop =  OFFSET_Y, nleft = OFFSET_X;
    $("#" + ID).html($(e.target).data(DATA)).css({
        position: "absolute", top: ntop, left: nleft
    }).show();
};
$(document).on("mouseenter", "*[title]", function (e) {
    $(this).data(DATA, $(this).attr("title"));
    $(this).removeAttr("title").addClass(CLS_ON);
    $("<div id='" + ID + "' />").appendTo("body");
    showAt(e);
});
$(document).on("mouseleave", "." + CLS_ON, function (e) {
    $(this).attr("title", $(this).data(DATA)).removeClass(CLS_ON);
    $("#" + ID).remove();
});
if (FOLLOW) { $(document).on("mousemove", "." + CLS_ON, showAt); }
}());

*/





function resetForm($form){
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

function populateForm($form, data){
    //resetForm($form);
	//console.log(data);
	
    $.each(data, function(key, value) {
    	if(typeof value == "object" && value != null){
    		populateForm($form, value.values[0]);
    	}else{
    		
            var $ctrl = $form.find('[name='+key+']');
            var $ctrlHidden = $form.find('[name='+key+'-hidden]');
            if ($ctrl.is('select')){
                $('option', $ctrl).each(function() {
                    if (this.value == value)
                        this.selected = true;
                });
            } else if ($ctrl.is('textarea')) {
                $ctrl.val(value);
            } else {
                switch($ctrl.attr("type")) {
                    case "text":
                    case "hidden":
                    	$ctrl.val(value);
                    	$ctrlHidden.val(value);
                        break;
                    case "checkbox":
                        if (value == '1')
                            $ctrl.prop('checked', true);
                        else
                            $ctrl.prop('checked', false);
                        break;
                    case "radio":
                    	//alert($ctrl.filter("[value='"+value+"']").attr('id'));
                    	$ctrl.filter("[value='"+value+"']").prop('checked', true);
                    	$ctrl.filter("[value='"+value+"']").parent().button("toggle");
                    	break;
                } 
            }
    	}
    	
    });
}

function validateRamq(ramqValue){
	//alert("ramq value : "+ramqValue);
	var flagRamq =  Validate.now(Validate.Presence, ramqValue);
	//alert("ramq presence : "+flagRamq);
    var flagRamqDep =  Validate.now(Validate.Custom, ramqValue, { against: function(value , args){
    		var dfr = value.substring(4,10);
    		var year = dfr.substring(0,2);
    		var month = dfr.substring(2,4);
    		var day = dfr.substring(4,6);
    		var dobyear = args.dobValue.substring(2,4);
    		var dobmonth = args.dobValue.substring(5,7);
    		if(args.sexValue == 2){
    			dobmonth = dobmonth*1 + 50;
    		}
    		var dobday = args.dobValue.substring(8,10);
    		/*
    		var validYear = (year == dobyear)?true:false;
    		var validMonth = (month == dobmonth)?true:false;
    		var validDay = (day == dobday)?true:false;
    		if(validYear && validMonth && validDay){
    			return true;
    		}else{
    			return false;
    		}
    		*/
    		return true;
    	}, args: {sexValue: $("input[name='sex']").val(), dobValue: $("#dob-value").val()} });
    //alert("ramq dob : "+flagRamqDep);
    var flagRamqName =  Validate.now(Validate.Custom, ramqValue, { against: function(value , args){
		var nume3L = value.substring(0,3).toLowerCase();
		var prenume1L = value.substring(3,4).toLowerCase();
		var lname3L = args.lnameValue.substring(0,3).toLowerCase();
		var fname1L = args.fnameValue.substring(0,1).toLowerCase();
		var validlname = (nume3L == lname3L)?true:false;
		var validfname = (prenume1L == fname1L)?true:false;
		/*
		if(validlname && validfname){
			return true;
		}else{
			return false;
		}
		*/
		return true;
	}, args: {fnameValue: $("#fname-value").val(), lnameValue: $("#lname-value").val()} });
    //var flagRamqForm = Validate.Format( ramqValue, { pattern: /^([a-z]){4}([0-9]){8}$/i, failureMessage: "Failed!" } );
    var flagRamqForm = Validate.now(Validate.Format, ramqValue,  { pattern: /^([a-z]){4}([0-9]){8}$/i } );
    
    	
    	
    
    if(flagRamq && flagRamqDep && flagRamqName && flagRamqForm){
    	return true;
    }else{
    	if(!flagRamq){
    		var t = $("#errortext-patient").html();
			$("#errortext-patient").html(t+"<p>RAMQ Number cannot be empty!</p>");
    	}
    	if(!flagRamqDep){
    		var t = $("#errortext-patient").html();
			$("#errortext-patient").html(t+"<p>RAMQ Number must contain the corect date of birth and gender information!</p>");
    	}
    	if(!flagRamqName){
    		var t = $("#errortext-patient").html();
			$("#errortext-patient").html(t+"<p>RAMQ Number must contain the corect initials from first name and last name!</p>");
    	}
    	if(!flagRamqForm){
    		var t = $("#errortext-patient").html();
			$("#errortext-patient").html(t+"<p>RAMQ Number must have the correct format XXXX12341234. Four letters and eight numbers.</p>");
    	}
    	return false;
    }
}

function validateChart(chartValue){
	var flagChart =  Validate.now(Validate.Presence, chartValue);
	flagChart =  Validate.now(Validate.Numericality, chartValue);
    if(flagChart){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>Chart Number must be a number!</p>");
    	return false;
    }
}


function validateFname(fnameValue){
	var flagFname =  Validate.now(Validate.Presence, fnameValue);
    if(flagFname){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>First name cannot be empty!</p>");
    	return false;
    }
}

function validateLname(lnameValue){
	var flagLname =  Validate.now(Validate.Presence, lnameValue);
    if(flagLname){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>Last name cannot be empty!</p>");
    	return false;
    }
}

function validateDdate(ddateValue){
	var flagDdate =  Validate.now(Validate.Presence, ddateValue);
    if(flagDdate){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>Date of diagnosis cannot be empty!</p>");
    	return false;
    }
}

function validatePhone(phoneValue){
	var flagPhone = true; 
		if (phoneValue != null && phoneValue != ""){
			try{
				flagPhone = Validate.Format( phoneValue, { pattern: /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/i, failureMessage: "The phone format shoud be xxx xxx xxxx or yyy-yyy-yyyy" } );
			}catch(err){
				var t = $("#errortext-patient").html();
				$("#errortext-patient").html(t+"<p>"+err.message+"</p>");
		    	return false;
			}
		}
		return flagPhone;
}

function validateDtype(dtypeValue){
	var flagDtype =  Validate.now(Validate.Exclusion, dtypeValue, { within: [ '0', 0 ], allowNull: false, partialMatch: false, caseSensitive: false });
    if(flagDtype){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>Type of diagnosis cannot be unknown!</p>");
    	return false;
    }
}

function validateCommunity(idcommunityValue){
	var flagCommunity =  Validate.now(Validate.Exclusion, idcommunityValue, { within: [ '0', 0 ], allowNull: false, partialMatch: false, caseSensitive: false });
    if(flagCommunity){
    	return true;
    }else{
   		var t = $("#errortext-patient").html();
		$("#errortext-patient").html(t+"<p>Community cannot be unknown!</p>");
    	return false;
    }
}

function validateDeceased(dodValue,dcauseValue){
	var dValue = $("input[name='deceased']:checked").val();
	//alert("deceased : "+dValue);
	if(dValue == 1){
		var flagDod =  Validate.now(Validate.Presence, dodValue);
		var flagDcause =  Validate.now(Validate.Presence, dcauseValue);
		if(flagDod && flagDcause){
			return true;
		}else{
			if(!flagDod){
				var t = $("#errortext-patient").html();
				$("#errortext-patient").html(t+"<p>If the person is deceased date of death cannot be empty!</p>");
			}
			if(!flagDcause){
				var t = $("#errortext-patient").html();
				$("#errortext-patient").html(t+"<p>If the person is deceased death cause cannot be empty!</p>");
			}
			return false;
		}
	}else{
		return true;
	}
}

function prepareDecesed(data){
	/*deceased tratment*/
	if($.type(data.dod) != "undefined" ){
		var d = {deceased: 0};
		var dodFlag = false;
		var dcauseFlag = false;
		if(data.dod == "" || data.dod == "NULL" || data.dod == null){
			dodFlag = false;
		}else{
			dodFlag = true;
		}
		if(data.dcause == "" || data.dcause == "NULL" || data.dcause == null){
			dcauseFlag = false;
		}else{
			dcauseFlag = true;
		}
		
		if(dodFlag || dcauseFlag){
			d.deceased = 1;
			$.extend(true,data,d);
		}else{
			d.deceased = 0;
			$.extend(true,data,d);
		}

	}
	return data;
}

function prepareDiabet(data){
	
	if($.type(data.dtype) != "undefined" ){
		$.each(data.dtype.values, function(index, obj){
			if(obj.dtype == "10"){
				data.dtype.values[index].dtype = "3";
				data.dtype.values[index].value = "3";
			}
			if(obj.dtype == "11"){
				data.dtype.values[index].value = "4";
				data.dtype.values[index].dtype = "4";
			}
		});
	}
	return data;
}

function prepareData(data){
	data = prepareDecesed(data);
	data = prepareDiabet(data);
	return data;
}




