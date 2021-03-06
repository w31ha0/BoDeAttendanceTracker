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
	
	onRowSelected = (rowData,rowID,sectionID) => {
		console.log("Selected name: "+rowData);
		currentSavedNames = this.state.savedNames.slice();
		currentRow = this.rows[rowData] ;
		index =  this.state.savedNames.indexOf(rowData);
		console.log("Names before saving are "+Store.getSavedNames());
		if ( index == -1){
			currentRow.setNativeProps( {style : {backgroundColor: '#FFF2D3'} });
			currentSavedNames.push(rowData);
		}
		else{
			currentRow.setNativeProps( {style : { backgroundColor: 'white'} });
			currentSavedNames.splice(index,1);
		}
		this.setState({
			savedNames : currentSavedNames ,
		}, () => console.log("Saved names are now "+this.state.savedNames));
	}
	
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		if (this.state.savedNames.indexOf(rowData) != -1 )
			return (
						<TouchableOpacity onPress={this.onRowSelected.bind(this,rowData,rowID,sectionID)}>
							<View style = {{ backgroundColor: '#FFF2D3'}}ref={ (row) => this.rows[rowData] = row }>
								<Text style={styles.nameRow}>{rowData}</Text>
							</View>
						</TouchableOpacity>
			);
		else
			return (
						<TouchableOpacity onPress={this.onRowSelected.bind(this,rowData,rowID,sectionID)}>
							<View ref={ (row) => this.rows[rowData] = row }>
								<Text style={styles.nameRow}>{rowData}</Text>
							</View>
						</TouchableOpacity>
			);
	}
	
	renderSectionHeader = (sectionData, sectionID) => {
		switch (sectionID){
			case "Group A":
				return (
				<View style={{borderWidth:0.5}}>
					<Text style={styles.section1} >{sectionID}</Text>
				</View>
			);
			case "Group B":
				return (
				<View style={{borderWidth:0.5}}>
					<Text style={styles.section2} >{sectionID}</Text>
				</View>
			);
			case "Group C":
				return (
				<View style={{borderWidth:0.5}}>
					<Text style={styles.section3} >{sectionID}</Text>
				</View>
			);
			default:
				return (
				<View style={{borderWidth:0.5}}>
					<Text style={styles.nameRow}>{sectionID}</Text>
				</View>
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
			<ListView 
				  enableEmptySections = {true}
				  style = {styles.listTabListView}
				  dataSource={this.state.dataSource}
				  renderRow={this.renderRow}
				  renderSectionHeader={this.renderSectionHeader}
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