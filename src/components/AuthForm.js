import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';
import {signin} from '../store/actions/currentUser';



const AuthForm = ({headerText, btnText, type})=>{
	const error = useSelector((state)=>state.errors.error);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword]= useState("")
	const [name, setName] =useState("")
	return (
		<View>
			<Spacer>
				<Text h3>{headerText}</Text>
			</Spacer>
			{type==="signup" && (
				<Spacer>
					<Input
						label="Name"
				        value={name}
				        onChangeText={setName}
				        autoCapitalize="none"
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
			        autoCorrect={false}
				/>
			</Spacer>
			{error ? (
		        <Text style={styles.errorMessage}>{error}</Text>
		    	) : null}
		    
			<Spacer>
				<Button title={btnText} onPress={()=>dispatch(signin(type, {email,password,name }))} buttonStyle={styles.button}/>
			</Spacer>
		</View>
	)
}



const styles= StyleSheet.create({
	button:{
		backgroundColor:'#00ad8e'
	},
	errorMessage:{
	    fontSize: 16,
	    color: 'red',
	    marginLeft: 15,
	    marginTop: 15
	}
}); 


export default AuthForm;