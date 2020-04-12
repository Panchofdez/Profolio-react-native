import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';


const TimelineFormScreen = ({navigation})=>{
	return (
		<SafeAreaView style={styles.container}>
			<Spacer>
				<Text style={styles.text} h4>My Career Timeline</Text>
				<Text style={styles.text}>Add achievements, events, education and past jobs to your timeline</Text>
			</Spacer>
			<View style={{justifyContent:'flex-end', flex:1}}>
				<Spacer>
					<Button buttonStyle={styles.button} title="Finish"/>	
				</Spacer>
			</View>
		</SafeAreaView>
	)
}



const styles= StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25
	},
	text:{
		color:'white',
		marginBottom:10
	},
});


export default TimelineFormScreen;