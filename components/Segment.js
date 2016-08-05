import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons'
import * as Actions from '../action/Action';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import styles from '../styles/styles';
export default class Segment extends Component{
				
	options = [
	  {
		label: 'Going',
		value: 1
	  },
	  {
		label: 'Not going',
		value: 0
	  }
	]
	
	constructor(props){
		super(props);
		if (this.props.attendanceData[this.props.id] == 1)
			this.state = {
				thisAttendance : this.props.attendanceData,
				selectedOption : this.options[0],
				changedToNo : false,
				reason : "",
				};
		else if (this.props.attendanceData[this.props.id].length > 0 )
			this.state = {
				thisAttendance : this.props.attendanceData,
				selectedOption :  this.options[1],
				changedToNo : false,
				reason : "",
				};
		else
			this.state = {
				thisAttendance : this.props.attendanceData,
				changedToNo : false,
				reason : "",
				};
		console.log("Received attendance "+this.state.thisAttendance+" for event id:"+this.props.id);
	}
	
	submitReason = () => {
		console.log("Submitting reason "+this.state.reason);
		Actions.onSegmentControlChange(this.props.id,this.state.reason,this.props.currentName);
		this.setState({
			changedToNo : false,
		});
	}
	
	clearText = () => {
		console.log("Clearing text");
		this._textInput.setNativeProps({text: ''});
	}
	
	render() {    
		
		setSelectedOption = (selectedOption) => {
			this.setState({
			  selectedOption
			},function(){
				if (this.state.selectedOption.value == 0 ){
					this.setState({changedToNo : true});
				}
				Actions.onSegmentControlChange(this.props.id,this.state.selectedOption.value,this.props.currentName); // true
			}.bind(this));
	  }
	  
	  if (this.state.changedToNo)
		  return (
			<View style={{flex:1}}>
			  <TextInput style={{flex:1}}
				ref={component => this._textInput = component} 
				editable = {true}
				onChangeText={(text) => this.setState({reason : text})}
				onSubmitEditing = {this.submitReason}
				autoFocus = {true}
				selectTextOnFocus = {true}
				defaultValue = {"Enter reason here"}
			  />
			</View>);
	 else
		  return (
			<View>
			  <SegmentedControls
				style = {styles.segmentedControl}
				options={ this.options }
				onSelection={ setSelectedOption.bind(this) }
				selectedOption={this.state.selectedOption }
				separatorWidth = { 2 }
				separatorTint = { '#D24E4E' }
				tint= {'#D24E4E'}
				textAlign = {'center'}
				extractText={ (option) => option.label }
			  />
			</View>);
		}
		
}