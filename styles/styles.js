'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	headerText: {
		color: 'white' ,
		fontSize: 15,
		padding: 5,
		flex:20,
		marginTop:5,
	},
	headerBoxMain:{
		flex:1.5,
		flexDirection: 'row',
		backgroundColor: '#201F24',
	},
	headerBoxList:{
		flex:1.5,
		flexDirection: 'row',
		backgroundColor: '#201F24',
	},
	headerBoxAttendance:{
		flex:1.5,
		flexDirection: 'row',
		backgroundColor: '#201F24',
	},
	headerIcon:{
		flex:0.5,
		margin : 10,
		resizeMode  : 'contain' ,
	},
	refresh:{
		flex:0.5,
		margin : 10,
		resizeMode  : 'contain' ,
	},
	container: {
		flex : 1 ,
	  },
	containerIOS: {
		flex : 1 ,
		marginTop: 10,
	  },
	loadingContainer: {
		flex : 1 ,
		backgroundColor :'#FF7FED',
		justifyContent : 'center' ,
		alignItems : 'center',
	  },
	EmptyContainer: {
		flex : 1 ,
		justifyContent : 'center' ,
		alignItems : 'center',
	  },		  	  
	  smiley: {
		resizeMode  : 'contain' ,
		margin: 5,
	  },
	  loadingText: {
		color : 'white',
		margin: 5,
	  },
	  EmptyText: {
		color : 'black',
		margin: 5,
	  },
	sectionHeader: {
		color : 'black',
		fontSize : 17 ,
		padding :5 ,
		backgroundColor: '#68E02C',
	  },
	innerSectionHeader: {
		fontWeight: 'bold' ,
	  },
	attendanceTabListView: {
		flex : 15,
	  },
	listTabListView: {
		flex : 13 ,
	  },
	button: {
		flex : 1 ,
		margin:10,
	  },
	segmentListView: {
    margin: 10,
  },
    text: {
    margin: 10,
  },
    nameRow: {
    margin: 10,
	color : 'black',
  },
    scroll: {
	  flex:13,
  },
	lineSeparator: {
		flex : 1,
		height: 1,
        backgroundColor: 'grey',
	},
	section1: {
		color : 'black',
		fontSize : 15 ,
		padding :5 ,
        backgroundColor: '#F3BF2E',
	},
	section2: {
		color : 'black',
		fontSize : 15 ,
		padding : 5,
        backgroundColor: '#4FBFE5',
	},
	section3 : {
		color : 'black',
		fontSize : 15 ,
		padding : 5 ,
		backgroundColor: '#E23D4E',
	},
	section4 : {
		color : 'black',
		fontWeight : 'bold',
		fontSize : 15 ,
		padding : 5 ,
		backgroundColor: '#68E02C',
	},
	section5: {
		color : 'black',
		fontSize : 15 ,
		padding : 5 ,
		backgroundColor: '#68E02C',
	},
	segmentedControl : {
		flex:1,
	},
	eventText : {
		flex: 1,
		margin: 10,
		color : 'black',
	},
});