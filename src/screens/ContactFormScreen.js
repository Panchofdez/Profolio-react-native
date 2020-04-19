import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {FontAwesome5} from '@expo/vector-icons';
import {addContactInfo} from '../store/actions/myPortfolio';
import Loading from '../components/Loading';


const ContactFormScreen = ({navigation})=>{
	const {portfolio} = navigation.state.params;
	const dispatch = useDispatch();
	const [loading, setLoading] =useState(false);
	const [email, setEmail] = useState(portfolio.email || "");
	const [phone, setPhone] = useState(portfolio.phone || "");
	const [facebook, setFacebook] = useState(portfolio.facebook || "");
	const [instagram, setInstagram] = useState(portfolio.instagram || "");
	const handleSubmit = ()=>{
		setLoading(true);
		console.log(email, phone, facebook, instagram);
		dispatch(addContactInfo({email,phone, facebook, instagram}));

	}
	if(loading){
		return <Loading/>;
	}else{

		return(
			<SafeAreaView  style={styles.container}>
				<ScrollView keyboardShouldPersistTaps="handled">
					<Spacer>
						<Text style={styles.text}>Provide your contact information</Text>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							autoCapitalize="none"
					        autoCorrect={false}
							value={email}
							onChangeText={setEmail}
							label="Email"
						/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={phone}
							onChangeText={setPhone}
							label="Phone Number"
						/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							autoCapitalize="none"
							placeholder="username"
					        autoCorrect={false}
							value={facebook}
							onChangeText={setFacebook}
							label="Facebook"
						/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle}
							autoCapitalize="none"
					        autoCorrect={false}
					        placeholder="username"
							value={instagram}
							onChangeText={setInstagram}
							label="Instagram"
						/>
					</Spacer>
					<Spacer>
						<Button 
							buttonStyle={styles.button} 
							title="Save Changes" 
							onPress={()=>handleSubmit()}
							icon={
								<FontAwesome5
							      name="check-circle"
							      solid
							      size={25}
							      color="white"
							      style={{marginHorizontal:10}}
							    />
							}
						/>	
					</Spacer>
		
				</ScrollView>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
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
		fontSize:25,
		margin:10
	},
	inputStyle:{
		color:'white',
		fontSize:18
	},
	labelStyle:{
		color:'white'
	},
})



export default ContactFormScreen;