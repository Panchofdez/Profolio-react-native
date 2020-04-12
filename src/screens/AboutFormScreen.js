import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, ScrollView,View, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {editAbout} from '../store/actions/myPortfolio';
import Loading from '../components/Loading';

const AboutFormScreen = ({navigation})=>{
	const {portfolio} = navigation.state.params;
	const [location, setLocation] = useState(portfolio ? portfolio.location : '');
	const [type, setType] = useState(portfolio ? portfolio.type : '');
	const [birthday, setBirthday]=useState(portfolio ? portfolio.birthday : '');
	const [bio, setBio] = useState(portfolio? portfolio.about : '');
	const [loading, setLoading] =useState(false);
	const dispatch = useDispatch();

	const handleSubmit =()=>{
		setLoading(true);
		const data={
			location,
			type,
			birthday,
			about:bio
		}
		dispatch(editAbout(data))
	}
	if(loading){
		return <Loading/>
	}else{
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<Spacer>
						<Text style={styles.text} h4>About Me</Text>
						<Text style={styles.text}>Tell us about who you are and what you do</Text>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={location}
							onChangeText={setLocation}
							label="Location"
						/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={type}
							onChangeText={setType}
							label="Profession/Occupation"/>
					</Spacer>
					<Spacer>
						<Input 
							labelStyle={styles.labelStyle} 
							inputStyle={styles.inputStyle} 
							value={birthday}
							onChangeText={setBirthday}
							label="Birthday"/>
					</Spacer>
					<Spacer>
						<Text style={styles.label}>Bio</Text>
						<TextInput 
							multiline={true} 
							numberOfLines={4} 
							style={styles.bio} 
							value={bio} 
							onChangeText={setBio}/>				
					</Spacer>
					<View style={{justifyContent:'flex-end', flex:1}}>
						<Spacer>
							<Button buttonStyle={styles.button} title="Finish" onPress={()=>handleSubmit()}/>	
						</Spacer>
					</View>	
				</ScrollView> 	
			</SafeAreaView>
		)
	}
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
	bioContainer:{
		borderColor:'white',
		borderWidth:1
	},
	inputStyle:{
		color:'white',
		fontSize:18
	},
	labelStyle:{
		color:'white'
	},
	label:{
		color:'white',
		marginBottom:10,
		marginHorizontal:10,
		fontSize:18,
		fontWeight:'bold'
	},
	bio:{
		color:'white', 
		borderColor: 'rgba(250,250,250,0.6)',
		borderBottomWidth: 1,
		marginHorizontal:10,
		fontSize:18
	}
});


export default AboutFormScreen;