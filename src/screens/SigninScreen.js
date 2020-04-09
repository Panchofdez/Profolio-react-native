import React from 'react';
import { NavigationEvents} from 'react-navigation';
import {useDispatch} from 'react-redux';
import {SafeAreaView, StyleSheet, ImageBackground} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {clearErrorMessage} from '../store/actions/errors';
import backgroundImg from '../../assets/backgroundimg.jpg';


const SigninScreen = ({navigation})=>{
	const dispatch = useDispatch();
	return(		
		<SafeAreaView style={styles.container}>
			<ImageBackground source={backgroundImg} style={styles.background}>
				<NavigationEvents onWillFocus={()=>dispatch(clearErrorMessage())} />
				<AuthForm 
					headerText="Sign In" 
					btnText="Sign In" 
					type="signin"
				/>
				<NavLink 
					text="Don't have an account? Sign up!" 
					route="Signup"
					navigation={navigation}
				/>
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


export default SigninScreen;