import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';

const MyDivider=()=>{
	return(
		<Divider style={styles.divider}/>
	)
}


const styles = StyleSheet.create({
	divider:{
		backgroundColor:'#fff',
		marginVertical:5
	},
})


export default MyDivider;