/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content, Button} from 'native-base';
import styles from '../styles/styles';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Store from '../store/Store';
import * as Actions from '../action/Action';

export default class ListTab extends Component {
	
	rows = {} ;
	
	constructor(props){
		super(props);
		console.log("Constructing Store");
		const ds =  new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
		namesMap = {} ;
		namesMap["Group A"] = Store.getGroupANames();
		namesMap["Group B"] = Store.getGroupBNames();
		namesMap["Group C"] = Store.getGroupCNames();
		this.state={ 
					 dataSource : ds.cloneWithRowsAndSections(namesMap),
					savedNames : Store.getSavedNames(),
					 };	
	}	
	
	highlightSavedNames = () => {
		for (var i=0; i<this.state.savedNames.length;i++){
			var name = this.state.savedNames[i];
			console.log("Highlighting name "+name);
			this.rows[name].setNativeProps( { style : {backgroundColor: '#FFF2D3'} });
		}
	}
	
	onRowSelected = (rowData,rowID,sectionID) => {
		console.log("Selected name: "+rowData);
		currentSavedNames = this.state.savedNames;
		currentRow = this.rows[rowData] ;
		index =  this.state.savedNames.indexOf(rowData);
		if ( index == -1){
			currentRow.setNativeProps( {style : {backgroundColor: '#FFF2D3'} });
			currentSavedNames.push(rowData);
		}
		else{
			currentRow.setNativeProps( {style : { backgroundColor: 'white'} });
			currentSavedNames.splice(index,1);
		}
		console.log("Names before saving are "+currentSavedNames);
		this.setState({
			saveNames : currentSavedNames ,
		}, () => console.log("Saved names are now "+this.state.saveNames));
	}
	
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		return (
					<TouchableOpacity onPress={this.onRowSelected.bind(this,rowData,rowID,sectionID)}>
						<Text style={styles.nameRow} ref={ (row) => this.rows[rowData] = row } >{rowData}</Text>
					</TouchableOpacity>
		);
	}
	
	renderSectionHeader = (sectionData, sectionID) => {
		switch (sectionID){
			case "Group A":
				return (
				<Text style={styles.section1} >{sectionID}</Text>
			);
			case "Group B":
				return (
				<Text style={styles.section2} >{sectionID}</Text>
			);
			case "Group C":
				return (
				<Text style={styles.section3} >{sectionID}</Text>
			);
			default:
				return (
				<Text style={styles.nameRow}>{sectionID}</Text>
			);
		}	
	}
	
	saveNames = () => {
		Actions.saveNames(this.state.savedNames);
	}

	render(){
		return (
		<View  style={ styles.container}>
			<View style ={styles.headerBoxList}>
					<Image style={styles.headerIcon} source={require('../images/list-icon.png')} />
					<Text style={styles.headerText}>Select the names you wish to save</Text>
			</View>	
			<ListView style = {styles.listTabListView}
				  dataSource={this.state.dataSource}
				  renderRow={this.renderRow}
				  renderSectionHeader={this.renderSectionHeader}
				  onEndReached  = {this.highlightSavedNames}
				  />
				<Container style={styles.button}>
								<Content>
									<Button  small onPress={this.saveNames}>Save Names</Button>
								</Content>
				</Container>
		</View>
		);
	}	
}