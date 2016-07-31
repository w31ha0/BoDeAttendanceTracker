import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import Store from '../store/Store';
import styles from '../styles/styles';

export default class AttendanceTab extends Component{
	
	constructor(props){
		super(props);
		this.eventsToNameListMap = {} ;
		this.initialiseMaps();
		const ds =  new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
		this.state={ 
					 dataSource : ds.cloneWithRowsAndSections(this.eventsToNameListMap),
					 };	
	}	
	
	initialiseMaps = () => {
		eventsList = Store.getAllEvents();
		groupCnames=Store.getGroupCNames();
		groupBnames=Store.getGroupBNames();
		groupAnames=Store.getGroupANames();
		attendanceData=Store.getAllAttendance();
		for (var i =0;i<eventsList.length;i++){
			currentEvent = eventsList[i];
			attendaceForEvent = [] ;
			attendaceForEvent.push("Group C");
			attendaceForEvent=attendaceForEvent.concat( this.formAttendanceListForEventForGroup(groupCnames,i,attendanceData));
			attendaceForEvent.push("Group B");
			attendaceForEvent=attendaceForEvent.concat( this.formAttendanceListForEventForGroup(groupBnames,i,attendanceData));
			attendaceForEvent.push("Group A");
			attendaceForEvent=attendaceForEvent.concat( this.formAttendanceListForEventForGroup(groupAnames,i,attendanceData));
			console.log("Formed list "+attendaceForEvent+" for event "+currentEvent)
			this.eventsToNameListMap[currentEvent] = attendaceForEvent ;
		}
	}
	
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		switch (rowData){
			case "Group A":
				return (
				<Text style={styles.section1} >{rowData}</Text>
			);
			case "Group B":
				return (
				<Text style={styles.section2} >{rowData}</Text>
			);
			case "Group C":
				return (
				<Text style={styles.section3} >{rowData}</Text>
			);
			default:
				return (
				<Text style={styles.nameRow}>{rowData}</Text>
			);
		}	
	}
	
	renderSectionHeader = (sectionData, sectionID) => {
		return (
			<Text  style={styles.sectionHeader} >{sectionID}</Text>
		);
	}

	formAttendanceListForEventForGroup = (nameList,eventId,attendanceData) => {
		tempNameList = [];
		for (var j=0; j<nameList.length;j++){
				name = nameList[j] ;
				console.log("Checking" +name);
				attendance = attendanceData[name][eventId] ;
				console.log("Attendance is "+attendance);
				if (attendance == 1)
					tempNameList.push(name);
			}
		return tempNameList ;
	}
	
	render(){
		return (
			<View style={styles.container}>
				<View style ={styles.headerBoxAttendance}>
					<Image style={styles.headerIcon} source={require('../images/list-icon.png')} />
					<Text style={styles.headerText}>This shows the attendees of the events</Text>
				</View>	
				<ListView style = {styles.attendanceTabListView}
					  enableEmptySections={true}
					  dataSource={ this.state.dataSource}
					  renderRow={this.renderRow}
					  renderSectionHeader={this.renderSectionHeader}
				  />
			</View>
		);
	}
	
}