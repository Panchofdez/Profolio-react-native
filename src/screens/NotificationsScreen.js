import React,{useState}from'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button, Overlay, Text} from 'react-native-elements'
import Spacer from '../components/Spacer';
import {signout} from '../store/actions/currentUser';
import Loading from '../components/Loading';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NotificationsScreen = ()=>{
	const dispatch = useDispatch();
	return(
		<View>
			<Text>NotificationsScreen</Text>
			<Spacer>
				<Button title="Sign Out" onPress={()=>dispatch(signout())}/>
			</Spacer>
			<Button title="Press Me" onPress={()=>setIsVisible(true)}/>

		</View>
	)
}



const styles = StyleSheet.create({
	btnStyle:{
		borderRadius:25,
		margin:10
	}
});


export default NotificationsScreen;