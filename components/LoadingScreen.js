import React, { Component } from 'react';
import { Container, Content, Spinner} from 'native-base';
import {
  Text,
  View,
  Image,
} from 'react-native';
import styles from '../styles/styles';

export default class LoadingScreen extends Component{
	
	render(){
		return (
			<View style={styles.loadingContainer}>
				<Spinner/>
				<Image style={styles.smiley} source={require('../images/smiley.png')} />
				<Text style={styles.loadingText}>Please remain calm as the data is being fetched...</Text>
			</View>
		);
	}
}