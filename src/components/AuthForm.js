import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';
import * as Facebook from 'expo-facebook';
import {signin, fbLogin} from '../store/actions/currentUser';
import {FontAwesome} from '@expo/vector-icons';



const AuthForm = ({headerText, btnText, type})=>{
	const error = useSelector((state)=>state.errors.error);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword]= useState("");
	const [name, setName] =useState("");
	const facebookLogin = async() => {
		await Facebook.initializeAsync('1469000276640905');
		const {type,token}= await Facebook.logInWithReadPermissionsAsync({permissions:['public_profile', 'email']});
		if(type==='success'){
			dispatch(fbLogin(token));
		}else{
			console.log('cancelled');
			return;
		}
	}
	return (
		<View style={{marginTop:30}}>
			<Spacer>
				<Text h2 style={styles.title}>{headerText}</Text>
			</Spacer>
			{type==="signup" && (
				<Spacer>
					<Input
						label="Name"
				        value={name}
				        onChangeText={setName}
				        autoCapitalize="none"
				        inputStyle={{color:'#00ad8e'}}
			        	labelStyle={{color:'#00ad8e'}}
				        autoCorrect={false}
					/>
				</Spacer>

			)}
			<Spacer>
				<Input
					label="Email"
			        value={email}
			        onChangeText={setEmail}
			        autoCapitalize="none"
			       	inputStyle={{color:'#00ad8e'}}
			        labelStyle={{color:'#00ad8e'}}
			        autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<Input
					secureTextEntry
			        label="Password"
			        value={password}
			        onChangeText={setPassword}
			        autoCapitalize="none"
			        inputStyle={{color:'#00ad8e'}}
			        labelStyle={{color:'#00ad8e'}}
			        autoCorrect={false}
				/>
			</Spacer>
			{error ? (
				<Spacer>
		        	<Text style={styles.errorMessage}>{error}</Text>
		        </Spacer>
		    	) : null}
		    
			<Spacer>
				<Button title={btnText} onPress={()=>dispatch(signin(type, {email,password,name }))} buttonStyle={styles.button}/>
			</Spacer>
			<View>
				<Text style={styles.text}>OR</Text>
			</View>
			<Spacer>
				<Button 
					title={`${btnText} with Facebook`} 
					onPress={()=>facebookLogin()} 
					buttonStyle={styles.facebookBtn}
					icon={
						<FontAwesome name='facebook-square' size={30} color='white' style={{marginRight:10}}/>
					}
				/>
			</Spacer>
		</View>
	)
}



const styles= StyleSheet.create({
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25,
		height:45
	},
	facebookBtn:{
		backgroundColor:'#3b5998',
		borderRadius:25,
		height:45
	},
	errorMessage:{
	    fontSize: 16,
	    color: 'red',
	    marginLeft: 15,
	    marginTop: 15
	},
	title:{
		alignSelf:'center',
		color:'#00ad8e'
	},
	text:{
		alignSelf:'center',
		color:'#00ad8e',
		marginVertical:3
	}

}); 


export default AuthForm;