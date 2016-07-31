import dispatcher from '../dispatcher/dispatcher';

export function fetchEvents(){
	dispatcher.dispatch({
		type:"FETCH_EVENTS" ,
	});
}

export function fetchAllAttendance(){
	dispatcher.dispatch({
		type:"FETCH_ALL_ATTENDANCE" ,
	});
}

export function fetchNames(){
	dispatcher.dispatch({
		type:"FETCH_NAMES" ,
	});
}

export function onSegmentControlChange(eventId,isGoing,currentName){
	console.log("Is going for event:"+eventId+":"+isGoing);
	dispatcher.dispatch({
		type:"ON_SEGMENT_CONTROL_CHANGE" ,
		eventId:eventId,
		isGoing:isGoing,
		currentName:currentName,
	});
}

export function submitAttendance(){
	dispatcher.dispatch({
		type:"SUBMIT_ATTENDANCE" ,
	});
}

export function callForRefresh(){
	dispatcher.dispatch({
		type:"REFRESH" ,
	});
}

export function saveNames(namesToSave){
	dispatcher.dispatch({
		type:"SAVE_NAMES" ,
		namesToSave:namesToSave,
	});
}

export function loadSavedNames(){
	dispatcher.dispatch({
		type:"LOAD_SAVED_NAMES" ,
	});
}