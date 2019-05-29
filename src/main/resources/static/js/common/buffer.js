
		function loadNotes(){
			clearSections();
			$(".mainpage .main .page").load("/ncdis/client/templates/cdis.notes.html", function(patientObjArr){
				cdisSection = "notes";
				
				$("#ub_cdisbody_page").css("position","absolute");
				$("#ub_cdisbody_page").css("width","590px");
				$("#ub_cdisbody_page").css("right","0px");
				$("#ub_cdisbody_page").css("min-height","800px");
				$(".cdisbody_patient_record").css("position","absolute");
				$(".cdisbody_patient_record").css("width","400px");
				$(".cdisbody_patient_record").addClass("coverband");
				$(".temporar").show();
				drawPatientRecord(patientObjArray);
				$("#temporarDiv").hide();
				$("#patient-record-buttons").hide();
				$(".cdisbody").css("height",$("#ub_cdisbody_page").height());
				$(".cdisbody_patient_record").css("height",$("#ub_cdisbody_page").height());
				$(".cdisbody_patient").fadeIn(350);
				backArray.push("cdis.html?sid="+sid);
				backArrayIndex++;
				$("#menu li").removeClass("selected");
				$("#menu li").each(function( index ) {
					$(this).children(".notes_icon_").parent().addClass("selected");
				});
				var hcpObj = patientObjArray[1];
				$.each(profession_array, function(index,value){
					var n = hcpObj[value[0]];
					if(n == "null" || n == null || n == 'NULL'){
						n = "";
					}
					$("<tr>").append($("<td>",{class:"hcp-profession"}).text(value[1])).append($("<td>",{class:"hcp-name"}).text(n)).appendTo($("#hcp"));
				});	
				getPatientNotes();
				$(".search").fadeIn(350);
				initPage();
			});
		}

		
		






		function drawPatientSection(section, sectionObj, valuesArr){
			
			for(var i=0;i<valuesArr.length;i++){
				var valObj = eval("sectionObj."+valuesArr[i]);
				if(valObj.values[0].idvalue > 0){
					var limitsObj = getValueLimits(valuesArr[i]);
					drawValue(section, valuesArr[i], valObj.values[0], limitsObj);
				}
			}
		}





		function getObjectSection(arr){
			
			if(cdisSection == "mdvisits"){
				return arr[3];
			}else if(cdisSection == "lab"){
				return arr[6];
			}else if(cdisSection == "lipid"){
				return arr[5];
			}else if(cdisSection == "renal"){
				return arr[4];
			}else if(cdisSection == "complications"){
				return arr[7];
			}else if(cdisSection == "meds"){
				return arr[9];
			}else if(cdisSection == "miscellaneous"){
				return arr[8];
			}else if(cdisSection == "depression"){
				return arr[10];
			}
		}

		function getObjectArray(objectName, objectArray){
			if(objectName == "mdvisits"){
				return objectArray[3];
			}else if(objectName == "lab"){
				return objectArray[6];
			}else if(objectName == "lipid"){
				return objectArray[5];
			}else if(objectName == "renal"){
				return objectArray[4];
			}else if(objectName == "complications"){
				return objectArray[7];
			}else if(objectName == "meds"){
				return objectArray[9];
			}else if(objectName == "miscellaneous"){
				return objectArray[8];
			}else if(objectName == "depression"){
				return objectArray[10];
			}else if(objectName == "diabet"){
				var oa = objectArray[2];
				 $.each(oa, function(key, value) {
					var oarr = value.values;
					$.each(oarr, function(k, v) {
						var newvalues = {dtype:v.value, ddate:v.date , diabetcode:v.code, diabetidvalue:v.idvalue};
						$.extend(true,v,newvalues);
					});
				 });
				return oa;
			}else if(objectName == "hcp"){
				var oa = objectArray[1];
				return oa;
			}
		}

		
		

		function toggleRecord(flag){
			if(cdisSection == "editpatient" || cdisSection == "frontpage" || cdisSection == "addpatient" || cdisSection == "personalinfo" || cdisSection == "users" ||  cdisSection == "audit"){
				$(".cdisbody_patient_record").hide();
			}else{
				$(".cdisbody_patient_record").show();
			}	
			if(flag == null){
				
			}else{
				if(flag == "off"){
					$("#record-button").removeClass("selected").text("+");
					$("#patient-record-data").hide();
					//$("#patient-record-bmi").hide();
					$("#patient-record-buttons").hide();
					$("#patient-record-diabet").hide();
					$("#record-button-label").text("Maximize Record");
				}else if(flag == "on"){
					$("#record-button").addClass("selected").text("-");
					$("#patient-record-data").show();
					$("#patient-record-bmi").show();
					$("#patient-record-buttons").show();
					$("#patient-record-diabet").show();
					$("#record-button-label").text("Minimize Record");
				}
			}
			
		}


		function initAutocompleteHcp(obj){
			obj.autocomplete({
				delay: 300,
				minLength: 2,
				autoFocus: true,
				source: function( request, response ) {
					$.ajax({
						url: "/ncdis/service/data/getHcps",
						dataType: "json",
						data: {
							criteria:obj.attr('id'),
							term: request.term,
							language: "en",
							sid: sid
						},
						success: function( data ) {
							response($.map( data.objs[0], function( item ) {
								return {
									iduser : item.iduser,
									name : item.name
								};
							}));
						}
					});
				},
				position: {  collision: "flip"  },
				select: function( event, ui ) {
					//optionSelected = true;
					$("#"+obj.attr('id')).val(ui.item.name);
					$("#"+obj.attr('id')+"id").val(ui.item.iduser);
					return false;
				},
				open: function() {
					//optionSelected = false;
				},
				close: function() {
					
				}
			}).data("ui-autocomplete")._renderItem = function(ul, item) {
				var $line = $("<a>");
				var $container = $("<div>").appendTo($line);
				$("<div>",{class:'searchname'}).appendTo($container).append($("<span>").html(item.name));
				var $liline = $("<li>");
				$liline.append($line).appendTo(ul);
				$(ul).height(200);
				return $liline;
			};

		}
		
		
		

		

		function drawSectionRecord(arr){
			var sectionObj = getObjectSection(arr);
			var keys = getSortedKeys(sectionObj);
			var diab = getObjectArray("diabet", arr);
			var diabObj = diab.dtype.values[0];
			if(cdisSection == "complications"){
				
				$.each(complications_groups, function(index, groupArray){
					$("#group"+index+" .subsection-title").text(complications_groups_names[index]);
					
					$.each(groupArray, function(key,value){
						var valObj = eval("sectionObj."+value);
						//var limitsObj = getValueLimits(value);
						//drawValue(cdisSection, value, valObj.values[0], limitsObj, subsection);
						buildWidget(value,[valObj.values],$("#"+value));
					});
				});
			}else if(cdisSection == 'mdvisits'){
				var f = true;
				for(var i=0;i<keys.length;i++){
					
					if(keys[i] == "sbp" || keys[i] == "dbp"){
						if(f){
							console.log(sectionObj);
							var valO1 = sectionObj.sbp;
							var valO2 = sectionObj.dbp;
							buildWidget('sbp_and_dbp',[valO1.values,valO2.values],$("#sbp_and_dbp"));
							f = false;
						}
					}else{
						var valObj = eval("sectionObj."+keys[i]);
						buildWidget(keys[i],[valObj.values],$("#"+keys[i]));
					}
				}
			}else{
				for(var i=0;i<keys.length;i++){
					var valObj = eval("sectionObj."+keys[i]);
					//var limitsObj = getValueLimits(keys[i]);
					if(keys[i] != "ogtt" && (diabObj.value != "1" || diabObj.value != "2")){
						/*there is no ogtt when diabet type = 1 or 2*/
						//drawValue(cdisSection, keys[i], valObj.values[0], limitsObj);
						buildWidget(keys[i],[valObj.values],$("#"+keys[i]));
					}
				}
			}
		}


					

		function drawPatientRecordOptions(pObj){
			$("#abcgraphs-button").click(function() {
				openABCGraphs();
			});
		}


		function printHistoryGraph(title){
			$("#fullscreen").printJQPlot(title);
		}

		function printSectionGraphs(title){
				$("section").printJQPlot(title);
		}

		

		/*
		 * patient object = message oject
		 * 	status = 1|0
		 * 	
		 * 
		 * */

		
		function getValueSectionArray(section, value, arr){
			//cdisSection = section;
			//var objSection = getObjectSection(arr);
			var objSection = getObjectArray(section,arr);
			//console.log('object section - '+section+'  -  value:'+value);
			//console.log(objSection);
			var objValue = eval("objSection."+value);
			
			//console.log(objValue);
			if(typeof(objValue) != 'undefined'){
				return objValue.values;
			}else{
				return [];
			}
		}

		function getValueObject(section, value, arr){
			//cdisSection = section;
			var objSection = getObjectArray(section,arr);
			var objValue = eval("objSection."+value);
			if(typeof(objValue) != 'undefined'){
				objValue['name'] = value;
				return objValue;
			}else{
				return {};
			}
		}

		function saveValue(idvalue, section, valueName, dValue, vValue, patientObjectArray){
			var po = patientObjectArray[0];
			var valueResult = $.ajax({
				  url: "/ncdis/service/data/saveValue?sid="+sid+"&language=en&valueName="+valueName+"&value="+vValue+"&date="+dValue+"&idpatient="+po.idpatient+"&idvalue="+idvalue,
				  type: "GET",
				  async : false,
				  cache : false,
				  dataType: "json"
				});
			valueResult.done(function( json ) {
					patientObjArray = json.objs;
					patientObj = patientObjArray[0];
				});
			valueResult.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			  console.log(this.url);
			});	
		}

		function deleteValue(idvalue,patientObjectArray){
			var po = patientObjectArray[0];
			var value = $.ajax({
				  url: "/ncdis/service/data/deleteValue?sid="+sid+"&language=en&idvalue="+idvalue+"&idpatient="+po.idpatient,
				  type: "GET",
				  async : false,
				  cache : false,
				  dataType: "json"
				});
				value.done(function( json ) {
					patientObjArray = json.objs;
					patientObj = patientObjArray[0];
				});
				value.fail(function( jqXHR, textStatus ) {
					 alert( "Request failed: " + textStatus );
					  console.log(this.url);
				});	
			
		}


		