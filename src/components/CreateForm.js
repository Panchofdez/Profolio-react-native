import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input, Text, Button, Image} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import Spacer from '../components/Spacer';
import {FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import cloudinaryUpload from '../api/cloudinary';
import {createMyPortfolio, editProfile} from '../store/actions/myPortfolio';
import Loading from '../components/Loading';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CreateForm =({navigation, portfolio, type, btnType})=>{
	const [profileImage, setProfileImage]=useState(portfolio ? portfolio.profileImage : null);
	const [coverPhoto, setCoverPhoto]=useState(portfolio ? portfolio.headerImage: null);
	const [name, setName] = useState(portfolio ? portfolio.name : "");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const pickImage =async(type)=>{
		try {
			let permission =await  ImagePicker.getCameraPermissionsAsync();
			if(permission.granted ===false){
				let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
				if (permissionResult.granted === false) {
					alert("Permission to access camera roll is required!");
					return;
				}
			}	
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1
			
			});
			
			if (!result.cancelled) {
				if(type==='profile'){
					setProfileImage(result.uri);

				}else{
					setCoverPhoto(result.uri);
				}

				
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleSubmit = async()=>{
		if (name==="" || !profileImage){
			alert('You must provide a name and profile picture!');
			return;
		}
		if(type==="Create"){
			handleCreate()
		}else{
			handleEdit()
		}
		
	}
	const handleCreate= async()=>{	
		try{
			setLoading(true);
			const profileImageRes = await cloudinaryUpload(profileImage);
			let data ={}
			if(coverPhoto){
				const coverPhotoRes = await cloudinaryUpload(coverPhoto);
				data = {
					name, 
					profileImage:profileImageRes.secure_url,
					profileImageId:profileImageRes.public_id,
					headerImage:coverPhotoRes.secure_url,
					headerImageId:coverPhotoRes.public_id
				}
			}else{
				data={
					name, 
					profileImage:profileImageRes.secure_url,
					profileImageId:profileImageRes.public_id,
				}
			}
			
			dispatch(createMyPortfolio(data));
		}catch(err){
			console.log(err);
		}
	};
	const handleEdit = async()=>{
		try{
			setLoading(true);
			let formData = {}
			if(profileImage !== portfolio.profileImage){
				const profileImageRes = await cloudinaryUpload(profileImage);
				if(coverPhoto && coverPhoto!== portfolio.headerImage){
					const coverPhotoRes = await cloudinaryUpload(coverPhoto);
					formData = {
						name, 
						profileImage:profileImageRes.secure_url,
						profileImageId:profileImageRes.public_id,
						headerImage:coverPhotoRes.secure_url,
						headerImageId:coverPhotoRes.public_id
					}
				}else{
					formData={
						name, 
						profileImage:profileImageRes.secure_url,
						profileImageId:profileImageRes.public_id,
					}
				}
			}else{
				formData={
					name
				}
			}
			console.log(formData);
			dispatch(editProfile(formData));
		}catch(err){

		}
	}
	if(loading){
		return <Loading/>
	}else{
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<NavigationEvents onWillBlur={()=>{
						setCoverPhoto(null);
						setProfileImage(null);
						setName('')
						setLoading(false)
					}}/>	
					{type==='Create' ?(
						<Spacer>
							<Text style={styles.text} h4>Create Your Portfolio</Text>
							<Text style={styles.text}>Let's make it easy for people to find you</Text>
						</Spacer>
						): (
							<Spacer>
								<Text style={styles.title}>Let's make it easy for people to find you</Text>
							</Spacer>
						)}						
						
					
					<Spacer>
						<Input 
							labelStyle={{color:'white'}} 
							inputStyle={{color:'white'}} 
							label="Name" 
							placeholder="Your name or name of business"
							value={name}
							onChangeText={setName}
						/>
					</Spacer>
					<Spacer>
						<Button 
							buttonStyle={styles.button} 
							title={`${btnType} your profile picture`} 
							onPress={()=>pickImage('profile')}
							icon={
							    <FontAwesome5
							      name="camera"
							      solid
							      size={25}
							      color="white"
							      style={{marginHorizontal:10}}
							    />
							}
						/>	
					</Spacer>
					
					<View style={styles.imageContainer}>
						{profileImage && (<Image source={{uri:profileImage}} style={styles.profileImage} containerStyle={styles.imageContainerStyle}/>)}			
					</View>
					<Spacer>
						<Button 
							buttonStyle={styles.button} 
							title={`${btnType} your cover photo`} 
							onPress={()=>pickImage('cover')}
							icon={
							    <FontAwesome5
							      name="camera"
							      solid
							      size={25}
							      color="white"
							      style={{marginHorizontal:10}}
							    />
							}
						/>	
					</Spacer>
					<View style={styles.imageContainer}>
						{coverPhoto && (<Image source={{uri:coverPhoto}} style={styles.coverPhoto} containerStyle={styles.imageContainerStyle}/>)}
						
					</View>
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
	title:{
		color:'white',
		fontSize:25,
		margin:10
	},
	profileImage:{
		width:0.35 * width,
		height:0.15*height
	},
	imageContainerStyle:{
		borderRadius:25, 
		overflow:'hidden'
	},
	imageContainer:{
		alignItems:'center'
	},
	coverPhoto:{
		width:0.80*width,
		height:0.20*height
	}
});


export default CreateForm;