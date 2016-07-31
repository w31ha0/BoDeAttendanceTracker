import Store from '../store/Store';

export function getEventsFromString(stringArray){
	var eventsArray=[];
	for (var i=3;i<stringArray.length;i++){
		var startIndex=-1;
		var endIndex=-1;
		console.log("Decoding "+stringArray[i]);		
		var event= getKeyFromQuote(stringArray[i]);
		console.log("Decoded event: "+event);
		eventsArray.push(event);
	}
	return eventsArray ;
}

export function getAttendanceFromJsonArray(jsonArray){
	var events = Store.getAllEvents();
	var NamesToAttendanceArrayMap = {};
	for (var i=0;i<jsonArray.length;i++){
		var attendanceArray = Array(events.length).fill("");
		var personData = JSON.stringify(jsonArray[i]);
		console.log("Person data "+personData);
		var array = personData.split(',');
		var nameData = array[1] ;
		if (nameData == null)
			continue ; 
		var key = getKeyFromQuote(nameData);
		var name = getValueFromQuote(nameData).substring(1,nameData.length-1);
		if ( key != "姓名" || name == "姓名")
			continue ;
		console.log("FOUND NAME"+name);
		NamesToAttendanceArrayMap[name]=Array(events.length).fill("");
		for (var j=3;j<array.length;j++){
			var quotedStr = array[j];
			var event = getKeyFromQuote(quotedStr);
			var attendanceValue = getValueFromQuote(quotedStr);
			var lastChar = attendanceValue.charAt(attendanceValue.length-1) ;
			if (attendanceValue.charAt(0) == '"')
				attendanceValue=attendanceValue.substring(1,attendanceValue.length);
			if (lastChar == '"'){
				console.log("Cutting off last char");
				attendanceValue=attendanceValue.substring(0,attendanceValue.length-1);
			}
			console.log("Decoded attendance: "+attendanceValue+" for "+event);
			attendanceArray[events.indexOf(event)]=attendanceValue;
			NamesToAttendanceArrayMap[name]=attendanceArray;
		}
	}
	return NamesToAttendanceArrayMap;
}

export function getNamesFromJsonArray(jsonArray){
	var namesArray = [] ;
	for (var i=0;i<jsonArray.length;i++){
		var nameData = JSON.stringify(jsonArray[i]);
		var name = getValueFromQuote(nameData);
		name = name.substring(1,name.length-1);
		console.log("Extracted name "+name);
		namesArray.push(name);
	}
	return namesArray ;
}

	
export function fillArrayFromPromiseObject (object){
		string = object.toString();
		namesArray = string.split(',');
		return namesArray ;
	}

function getKeyFromQuote(quotedStr){
	var startIndex=-1;
	var endIndex=-1;
	for (var j=0;j<quotedStr.length;j++){
			var char = quotedStr[j];
			if (char == '"')
				if (startIndex == -1){
					startIndex=j;
				}
				else{
					endIndex=j;
					break;
				}
		}
	return quotedStr.substring(startIndex+1,endIndex);
}

function getValueFromQuote(quotedStr){
	var startIndex=-1;
	var endIndex=quotedStr.length-1;
	for (var j=0;j<quotedStr.length;j++){
			var char = quotedStr[j];
			if (char == ':'){
				startIndex=j+1;
				break;
			}
		}
	if (endIndex==startIndex)
		endIndex+=1;
	return quotedStr.substring(startIndex,endIndex);
}