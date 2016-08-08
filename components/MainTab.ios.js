/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content, Button , Spinner} from 'native-base';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ToastAndroid,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

import Store from '../store/Store';
import * as Actions from '../action/Action';
import CustomList from './CustomList';
import styles from '../styles/styles';

export default class MainTab extends Component {
	
	segmentedControls = [] ;
	emptyArray = [];

	constructor(props){
		super(props);
		this.state={ 
					 currentName : Store.getSavedNames()[0],
					 savedNamesMain : Store.getSavedNames(),
					 };
	}
	
	componentDidMount() {
		console.log("Segmented Controls are "+this.segmentedControls);
		Store.on("submitSuccessful",() => {
			if (Platform.OS === 'ios') {
			  AlertIOS.alert(
				 'Completed',
				 'Submited successfully'
				);
			} else {
			  ToastAndroid.show('Submited successfully', ToastAndroid.SHORT);
			}
		});
		Store.on("submitFailed",() => {
			if (Platform.OS === 'ios') {
			  
			} else {
			  ToastAndroid.show('Submission failed!', ToastAndroid.SHORT);
			}
		});
		Store.on("savedNamesMainLoaded",() => {
			console.log("Detected saved names from main");
		});
		Store.on("ChangeList",() => {
			console.log("Changing list");
			this.setState({
					savedNamesMain : this.emptyArray,
				}, () => {this.setState({
					savedNamesMain : Store.getSavedNames(),
				}); }
			);
		});

	}
	
	submitAttendance = () => {
			Actions.submitAttendance();
			
	}
	
	onAttendanceReady = () => {
		this.setState({ attendanceFetched: true });
	} 

	callForRefresh = () => {
		Store.emit("callForRefresh");
	}
	
	render(){
		if (Store.getSavedNames().length == 0)
			return (
			<View style={styles.EmptyContainer}>
				<Image style={styles.smiley} source={require('../images/saddy.png')} />
				<Text style={styles.EmptyText}>You have not saved any names yet.</Text>
				<Text style={styles.EmptyText}>Go to the NameList Tab</Text>
				<Text style={styles.EmptyText}>to save the names you wish to track</Text>				
			</View>
		);
		else
			return (
				<View style={styles.containerIOS}>
					<View style ={styles.headerBoxMain}>
						<Image style={styles.headerIcon} source={require('../images/click-icon.png')} />
						<Text style={styles.headerText}>Edit the Attendance and hit "Submit"</Text>
						<TouchableOpacity onPress={this.callForRefresh}>
							<Image style={styles.refresh} source={require('../images/reload.png')} />
						</TouchableOpacity>
					</View>	
					<ScrollView style = {styles.scroll}>
					{ 		
							this.state.savedNamesMain.map((s, i) => {
									console.log("Founded name"+s);
									return  <CustomList 
									style={styles.list}
									key={i}
									currentName={s} 
									id = {i}
									/>
							 }) 
					}
					</ScrollView>
					<Container style = {styles.button}>
						<Content>
							<Button small onPress={this.submitAttendance}>Submit</Button>
						</Content>
					</Container>
					</View>
			);
	}
	
}