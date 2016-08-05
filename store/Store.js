import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher';
import * as helper from '../Helpers/helper';
import Constants from '../constants/Constants';

import {
	AsyncStorage,
	Platform,
	ToastAndroid,
} from 'react-native';

class Store extends EventEmitter{
	
	constructor(){
		super();
		this.events=[];
		this.namesForAGroup = [];
		this.namesForBGroup = [];
		this.namesForCGroup = [];
		this.attendanceData={};
		this.savedNames = [] ;
	}	
	
	fetchEvents = () => {
		fetch(Constants.eventsURL)
		  .then((response) => {
			var str = JSON.stringify(response);
			console.log("RECEIVED "+str);
			if (response["headers"]["map"]["content-type"] == "application/json; charset=utf-8")
				return response.json()
		  })
		  .then((responseJson) => {
			  if (responseJson == null){
				  this.onDataNotFound();
				  return ;
			  }
			var str = JSON.stringify(responseJson);
			console.log("JSON detected:"+responseJson);
			var array = str.split(',');
			array = helper.getEventsFromString(array);
			console.log("Output of array is "+array);
			this.events=array;
			this.emit("EventsFetched");
			return responseJson
		  })
		  .catch((error) => {
			  console.log("ERROR");
			console.error(error);
		  });
	}
	
	fetchAllNames = () => {
		console.log("Now fetching names for All groups");
		this.fetchNamesForGroup('A');
		this.fetchNamesForGroup('B');
		this.fetchNamesForGroup('C');
	}
	
	fetchNamesForGroup = (groupChar) => {
		console.log("Fetching for Group "+groupChar);
		fullURL = Constants.namesURL + "?class=" + groupChar ;
		fetch(fullURL)
				  .then((response) => {
					  	if (response["headers"]["map"]["content-type"] == "application/json; charset=utf-8")
							return response.json()
				  })
				  .then((responseJson) => {
					   if (responseJson == null){
						  this.onDataNotFound();
						  return ;
					  }
					var str = JSON.stringify(responseJson);
					console.log("RECEIVED NAMES "+str+" for Group "+groupChar);	
					switch( groupChar ){
						case 'A':
							this.namesForAGroup = helper.getNamesFromJsonArray(responseJson);
							break;
						case 'B':
							this.namesForBGroup = helper.getNamesFromJsonArray(responseJson);						
							break;
						case 'C':
							this.namesForCGroup = helper.getNamesFromJsonArray(responseJson);				
							this.emit("NamesFetched");
							break;
					} 
					return responseJson
				  })
				  .catch((error) => {
					    console.log("ERROR");
					console.error(error);
				  });//To replace with actual names fetched
	}
	
	fetchAllAttendanceData = () => {
		console.log("Now fetching attendance");
		this.attendanceData = {} ;
		fetch(Constants.attendanceURL)
				  .then((response) => {
					var str = JSON.stringify(response);
					if (response["headers"]["map"]["content-type"] == "application/json; charset=utf-8")
						return response.json()
				  })
				  .then((responseJson) => {
				  if (responseJson == null){
					  this.onDataNotFound();
					  return ;
				  }
					console.log("RECEIVED ATTENDANCE:"+responseJson);
					this.attendanceData = helper.getAttendanceFromJsonArray(responseJson);
					console.log("Attendance loaded as "+this.attendanceData);
						this.emit("AllAttendanceFetched");
					return responseJson
				  })
				  .catch((error) => {
					    console.log("ERROR");
					console.error(error);
				  });
	}

	submitAllAttendance = () => {
		for (var i=0; i<this.savedNames.length;i++){
			this.submitAttendance(this.savedNames[i]);
		}
	}
	
	submitAttendance = (currentName) => {
		fullURL=this.formSubmitURL(Constants.submitURL,currentName);
		fetch(fullURL)
		  .then((response) => {
			  console.log("Response from submission: "+response.status);
			  if (response.status == 200)
				  this.emit("submitSuccessful");
			  else
				  this.emit("submitFailed");
		  })
		  .catch((error) => {
			    console.log("ERROR");
			console.error(error);
		  });
	}
	
	loadSavedNames = () => {
		console.log("loading saved names...");
		namesSaved = AsyncStorage.getItem(Constants.keyForNames, (err, result) => {
			if (result  != null){
				this.savedNames = helper.fillArrayFromPromiseObject (result);
			}else
				console.log("No saved names found");
			this.emit("SavedNamesLoaded");
		});
	}
	
	onDataNotFound = () => {
		this.emit("dataNotFound");
	}
	
	getAllEvents = () => {
		return this.events;
	}
	
	getGroupANames = () => {
		return this.namesForAGroup;
	}
	
	getGroupBNames = () => {
		return this.namesForBGroup;
	}

	getGroupCNames = () => {
		return this.namesForCGroup;
	}
		
	getAllNames = () => {
		names = this.namesForAGroup.concat(this.namesForBGroup).concat(this.namesForCGroup);
		return names;
	}
	
	getAllAttendance = () => {
		return this.attendanceData;
	}
	
	getAttendanceFromName = (currentName) => {
		console.log("Getting attendance for individual"+currentName);
		return this.attendanceData[currentName];
	}
	
	getSavedNames = () => {
		return this.savedNames;
	}
	
	formSubmitURL(rawUrl,currentName){
		var tempArray = this.attendanceData[currentName];
		console.log("Submitting Attendance for "+currentName+": "+tempArray);
		var fullURL = rawUrl+"?name="+currentName;
		for (var x=0;x<tempArray.length;x++){
			fullURL += "&"+Constants.eventsMap[x]+"="+tempArray[x];
		}
		return fullURL;
	}
	
	saveNames = (namesToSave) => {
		AsyncStorage.setItem(Constants.keyForNames, namesToSave.toString(), (err) => {
			console.log("Error is "+err);
			if (err == null){
				if (Platform.OS === 'ios') {
			  			  AlertIOS.alert(
							 'Completed',
							 'Names Saved Successfully'
							);
			} else {
				ToastAndroid.show('Names Saved Successfully', ToastAndroid.SHORT);
				}
				this.emit("ChangeList");
			}
		});
	}
	
	handleAction = (action) => {
		switch (action.type){
			case "REFRESH":
				this.emit("callForRefresh");
				break;
			case "FETCH_EVENTS":
				this.fetchEvents();
				break;
			case "FETCH_ALL_ATTENDANCE":
				this.fetchAllAttendanceData();
				break;
			case "FETCH_NAMES":
				this.fetchAllNames();
				break;
			case "ON_SEGMENT_CONTROL_CHANGE":
				console.log("Detected that change in event "+action.eventId+" to "+action.isGoing);
				this.attendanceData[action.currentName][action.eventId]=action.isGoing;
				break;
			case "SUBMIT_ATTENDANCE":
				this.submitAllAttendance();
				break;
			case "SAVE_NAMES":
				this.saveNames(action.namesToSave);
				break;
			case "LOAD_SAVED_NAMES":
				this.loadSavedNames();
				break;
		}
		console.log("Received Action "+action);
	}
	
}

const store = new Store;
dispatcher.register(store.handleAction.bind(store));
window.dispatcher=dispatcher;
export default store;