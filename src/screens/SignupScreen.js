import React from 'react';
import { NavigationEvents} from 'react-navigation';
import {useDispatch} from 'react-redux';
import {SafeAreaView, StyleSheet, ImageBackground} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {clearErrorMessage} from '../store/actions/errors';
import backgroundImg from '../../assets/backgroundimg.jpg';
import Spacer from '../components/Spacer';

const SignupScreen = ({navigation})=>{
	const dispatch = useDispatch();
	return(
		<SafeAreaView style={styles.container}>
			<ImageBackground source={backgroundImg} style={styles.background}>
				<NavigationEvents onWillFocus={()=>dispatch(clearErrorMessage())} />
				<AuthForm 
					headerText="Sign Up" 
					btnText="Sign Up"
					type="signup"
					
				/>	
				<Spacer>		
					<NavLink 
						text="Already have an account? Sign in instead" 
						route="Signin"
						navigation={navigation}
					/>
				</Spacer>
			</ImageBackground>
		
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center'

	},
	background:{
		flex: 1,
    	resizeMode: "cover",
    	justifyContent: "center"
	}
});


export default SignupScreen;