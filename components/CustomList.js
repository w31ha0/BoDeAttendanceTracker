import React, { Component } from 'react';
import Store from '../store/Store';
import SegmentedControl from './Segment';
import {
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';
import styles from '../styles/styles';

export default class CustomList extends Component{
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={ 
				dataSource : ds.cloneWithRows(Store.getAllEvents()),
			};
	}
	
	
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		console.log("rendering row "+rowData);
		return (
			<View  key={this.state.key}  style={{flex: 1, flexDirection: 'row'}} >
				<Text style={styles.eventText}>{rowData}</Text>
				<SegmentedControl  currentName={this.props.currentName} attendanceData={Store.getAttendanceFromName(this.props.currentName)} id={rowID} style={{flex: 2,margin: 10}} />
			</View>
		);
	}
	
	render(){
		colorID=this.props.id%4;
		console.log("Color ID is "+colorID+" for "+this.props.currentName);
		switch (colorID){
			case 0:
				return (
					<View>
						<Text style={styles.section1} >{this.props.currentName}</Text>
						<ListView style={styles.segmentListView}
							  enableEmptySections={true}
							  dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  />
					  </View>
			);
			case 1:
				return (
					<View>
						<Text style={styles.section2} >{this.props.currentName}</Text>
						<ListView style={styles.segmentListView}
							  enableEmptySections={true}
							  dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  />
					</View>
			);
			case 2:
				return (
					<View>
						<Text style={styles.section3} >{this.props.currentName}</Text>
						<ListView style={styles.segmentListView}
							  enableEmptySections={true}
							  dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  />
					</View>
			);
			case 3:
				return (
					<View>
						<Text style={styles.section5} >{this.props.currentName}</Text>
						<ListView style={styles.segmentListView}
							  enableEmptySections={true}
							  dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  />
					</View>
			);
			default:
				return (
					<View>
						<Text style={styles.section5}>{this.props.currentName}</Text>
						<ListView style={styles.segmentListView}
							  enableEmptySections={true}
							  dataSource={this.state.dataSource}
							  renderRow={this.renderRow}
							  />
					</View>
			);
		}	
	}
}