import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import Spacer from '../components/Spacer';
import {signout} from '../store/actions/currentUser';
import Loading from '../components/Loading';

const NotificationsScreen = ()=>{
	const dispatch = useDispatch();
	return(
		<View>
			<Text>NotificationsScreen</Text>
			<Spacer>
				<Button title="Sign Out" onPress={()=>dispatch(signout())}/>
			</Spacer>
			
		</View>
	)
}



const styles = StyleSheet.create({});


export default NotificationsScreen;