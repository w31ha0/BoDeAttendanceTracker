/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import MainTab from './MainTab';
import ListTab from './ListTab';
import AttendanceTab from './AttendanceTab';
import Store from '../store/Store';
import * as Actions from '../action/Action';
import LoadingScreen from './LoadingScreen' ;
import PushNotification from 'react-native-push-notification' ;
import * as Animatable from 'react-native-animatable';
import timer from 'react-native-timer';
import ErrorScreen from './ErrorScreen';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class MainApp extends Component {
	animationDuration = 1500;
	
	constructor(props){
		console.log("Constructing main app");
		super(props);
		this.state = { 
			selectedTab : 'main',
			eventsFetched : false,
			attendanceFetched : false,
			namesFetched : false,
			savedNamesLoaded : false ,
			dataReady: false,
			dataNotAvailable: false,
		};
		Store.on("EventsFetched",() => {
			this.setState({eventsFetched : true});
			console.log("COMPLETED:EVENTS FETCHING");
			this.checkDataFetchComplete();
			this.fetchNames();
		});
		Store.on("AllAttendanceFetched",() => {
			this.setState({attendanceFetched : true},() => console.log("triggered")),
			console.log("COMPLETED:ATTENDANCE FETCHING, ATTENDANCE IS NOW ");
			this.checkDataFetchComplete();
			for (var key in Store.getAllAttendance()) {
				console.log(key+":"+Store.getAllAttendance()[key]);
			}
		});
		Store.on("NamesFetched",() => {
			this.setState({namesFetched : true});
			console.log("COMPLETED:NAMESFETCHING");
			this.checkDataFetchComplete();
			this.loadSavedNames();
		});
		Store.on("SavedNamesLoaded",() => {
			this.setState({savedNamesLoaded : true});
			console.log("COMPLETED:SAVED NAMES FETCHING");
			this.checkDataFetchComplete();
			savedNames = Store.getSavedNames();
			console.log("Saved names are "+savedNames);
			this.fetchAllAttendance();
		});
		Store.on("callForRefresh", () => {
			console.log("Received call for refresh");
			this.refresh();
		});
		Store.on("dataNotFound", () => {
			this.setState({ dataNotAvailable : true });
		});
		this.fetchAll();
		this.setupNotifications();
	}
	
	checkDataFetchComplete = () => {
		if (this.state.eventsFetched && this.state.attendanceFetched && this.state.namesFetched && this.state.savedNamesLoaded){
			this.animate1stTransition();
			timer.setTimeout("Transit", () => {
				this.setState({
					dataReady : true ,
				});		
			}
			,this.animationDuration);

		}
	}
	
	setupNotifications = () => {
		PushNotification.configure({
			// (required) Called when a remote or local notification is opened or received
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
			},

			// ANDROID ONLY: (optional) GCM Sender ID.
			senderID: "YOUR GCM SENDER ID",

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},

			// Should the initial notification be popped automatically
			// default: true
			//popInitialNotification: true,

			/**
			  * (optional) default: true
			  * - Specified if permissions (ios) and token (android and ios) will requested or not,
			  * - if not, you must call PushNotificationsHandler.requestPermissions() later
			  */
			requestPermissions: true,
		});
		
		PushNotification.localNotificationSchedule({
			message: "Please remember to update your attendance for this weekend!", // (required)
			date: this.getNearestFriday(), // in 60 secs
		});
		
	}
	
	getNearestFriday = () => {
		d= new Date();
		console.log("Date now is "+d);
		day = d.getDay();
		console.log("Today is Day: "+day);
		hour = d.getHours();
		minute = d.getMinutes();
		second = d.getSeconds();
		dayDifference = 5 - day ;
		if (dayDifference < 0)
			dayDifference+=7;
		console.log("Day difference is "+dayDifference);
		hourDifference = 18 - hour ;
		minuteDifference = -minute;
		secondDifference = -second;
		timeToSchedule = d.getTime() + dayDifference*24*60*60*1000 + hourDifference*60*60*1000 + minuteDifference*60*1000 + secondDifference*1000;
		dateToSchedule = new Date(timeToSchedule);
		console.log("Notification scheduled for date "+dateToSchedule);
		return dateToSchedule;
	}

	animate1stTransition= () => {
		this.refs.loadingScreen.transitionTo({opacity: 0},this.animationDuration);
	}
	
	animate2ndTransition= () => {
		this.refs.MainScreen.transitionTo({opacity: 0},{opacity: 1},this.animationDuration);
	}
	
	refresh = () => {
		this.setState({
			eventsFetched : false,
			attendanceFetched : false,
			namesFetched : false,
			savedNamesLoaded : false ,
			dataReady: false,
			dataNotAvailable : false,
		});
		this.fetchAll();
	}

	fetchAll = () => {
		this.fetchEvents();
	}
	
	fetchAllAttendance = () => {
			Actions.fetchAllAttendance();
	}
	
	fetchEvents = () => {
			Actions.fetchEvents();
	}
	
	fetchNames = () => {
			Actions.fetchNames();
	}		
	
	loadSavedNames = () => {
			Actions.loadSavedNames();
	}		
	
	render(){
		if (this.state.dataNotAvailable)
			return (
			<ErrorScreen/>
		);
		else if (this.state.dataReady){
			console.log("Moving into main app"+this.state.eventsFetched+this.state.attendanceFetched+this.state.namesFetched+this.state.savedNamesLoaded);
			return (
				<TabNavigator>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'main'}
					title="Main"
					onPress={() => this.setState({ selectedTab: 'main' })}>
					<MainTab/>
				  </TabNavigator.Item>
				 <TabNavigator.Item
					selected={this.state.selectedTab === 'nameList'}
					title="Name List"
					onPress={() => this.setState({ selectedTab: 'nameList' })}>
					<ListTab/>
				  </TabNavigator.Item>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'attendanceList'}
					title="Attendance List"
					onPress={() => this.setState({ selectedTab: 'attendanceList' })}>
					<AttendanceTab/>
				  </TabNavigator.Item>
				</TabNavigator>
			);
		}
		else
			return (
			<Animatable.View ref="loadingScreen" style={{flex:1}}>
				<LoadingScreen/>
			</Animatable.View>
		);
	}
	
}