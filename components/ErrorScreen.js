import React, { Component } from 'react';
import { Container, Content, Spinner} from 'native-base';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/styles';
import Store from '../store/Store';

export default class ErrorScreen extends Component{
	
	render(){
		return (
			<View style ={{flex:1}}>
				<TouchableOpacity style={styles.loadingContainer} onPress = { () => Store.emit("callForRefresh")} >
					<Image style={styles.smiley} source={require('../images/saddy.png')} />
					<Text style={styles.loadingText}>Excel sheet  for current month not created!</Text>
					<Text style={styles.loadingText}>Tap on the screen to try again</Text>
				</TouchableOpacity>
			</View>
		);
	}
}