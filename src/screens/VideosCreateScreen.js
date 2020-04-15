import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, ScrollView, StyleSheet,TextInput} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {FontAwesome5} from '@expo/vector-icons';
import {addVideo} from '../store/actions/myPortfolio';



const VideosCreateScreen =({navigation})=>{
	const [link, setLink] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const dispatch=useDispatch();
	const handleSubmit=()=>{
		if(link === ""){
			alert("Youtube link is required");
			return;
		}
		const videoId = link.split('/').slice(-1)[0];
		console.log(videoId)
		if(videoId.length!==11){
			alert("Invalid Youtube Link");
			return;
		}
		const video ={
			video:{
				link:videoId,
				title,
				description
			}
		}
		console.log(video);
		dispatch(addVideo(video));
	}
	return(
		<SafeAreaView style={styles.container}>
			<ScrollView keyboardShouldPersistTaps="handled">
				<Spacer>
					<Text style={styles.text}>Share your videos from Youtube </Text>
				</Spacer>
				<Spacer>
					<Input 
						labelStyle={styles.labelStyle} 
						inputStyle={styles.inputStyle} 
						value={link}
						onChangeText={setLink}
						label="Youtube Link"
					/>
				</Spacer>
				<Spacer>
					<Input 
						labelStyle={styles.labelStyle} 
						inputStyle={styles.inputStyle} 
						value={title}
						onChangeText={setTitle}
						label="Title"/>
				</Spacer>
				<Spacer>
					<Text style={styles.label}>Description</Text>
					<TextInput 
						multiline={true} 
						numberOfLines={3} 
						style={styles.description} 
						value={description} 
						onChangeText={setDescription}
					/>				
				</Spacer>
				<Spacer>
					<Button 
						buttonStyle={styles.button} 
						title="Add Video" 
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


const styles=StyleSheet.create({
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
		color:'white',
		fontSize:18
	},
	label:{
		color:'white',
		marginBottom:10,
		marginHorizontal:10,
		fontSize:18,
		fontWeight:'bold'
	},
	description:{
		color:'white', 
		borderColor: 'rgba(250,250,250,0.6)',
		borderBottomWidth: 1,
		marginHorizontal:10,
		fontSize:18
	},
	title:{
		color:'white',
		margin:10,
		fontSize:25
	},
})



export default VideosCreateScreen;