import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Button, Input, Image, Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import Divider from '../components/Divider';
import Loading from '../components/Loading';
import {FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import cloudinaryUpload from '../api/cloudinary';
import {editCollection, deleteCollection, deleteCollectionPhoto} from '../store/actions/myPortfolio';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CollectionEditScreen = ({navigation})=>{
	const {collection} = navigation.state.params;
	const [title, setTitle]= useState(collection.title);
	const [description, setDescription]=useState(collection.description);
	const [image,setImage]=useState(null);
	const [photos, setPhotos] = useState(collection.photos);
	const [loading, setLoading] = useState(false);
	const dispatch= useDispatch();
	console.log(collection._id)
	const pickImage =async()=>{
		try {
			let permission =await ImagePicker.getCameraPermissionsAsync();
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
				setImage(result.uri);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleSubmit=async()=>{
		setLoading(true);
		try{
			const response = await cloudinaryUpload(image);
			console.log(response);
			const data={
				title,
				description,
				image:response.secure_url,
				imageId:response.public_id
			}

			dispatch(editCollection(data, collection._id));

		}catch(err){
			console.log(err)
			return;
		}
	};
	const deletePhoto=(id)=>{
		if(photos.length===1){
			alert('Your collection must have at least one photo');
			return;
		}
		setLoading(true);
		dispatch(deleteCollectionPhoto(collection._id, id.split('/')[1]));
	}
	if(loading){
		return <Loading/>
	}else{

		return(
			<SafeAreaView style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<View>
							<Spacer>
								<Text style={styles.text}h4>Edit Collection</Text>
							</Spacer>
							<Spacer>
								<Input 
									labelStyle={styles.labelStyle} 
									inputStyle={styles.inputStyle} 
									value={title}
									onChangeText={setTitle}
									label="Title"
								/>
							</Spacer>
							<Spacer>
								<Input 
									labelStyle={styles.labelStyle} 
									inputStyle={styles.inputStyle} 
									value={description}
									onChangeText={setDescription}
									label="Description"
								/>
							</Spacer>
							<Spacer>
								<Button 
									buttonStyle={styles.button} 
									title="Add a photo" 
									onPress={()=>pickImage()}
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
								{image && (<Image source={{uri:image}} style={styles.image} containerStyle={styles.imageContainerStyle}/>)}			
							</View>
							<View>
								<Spacer>
									<Button buttonStyle={styles.button} title="Save Changes" onPress={()=>handleSubmit()}/>	
								</Spacer>
							</View>
							<Spacer/>
							<Divider/>
							<Spacer>
								<Text style={styles.text} h4>Delete Photos</Text>
							</Spacer>
						</View>
					}
					data={photos}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>(
						<Spacer>
							<View style={styles.photosContainer}>
								<Image source={{uri:item.image}} style={styles.photo} containerStyle={styles.imageContainerStyle}/>
								<TouchableOpacity onPress={()=>deletePhoto(item.imageId)}> 
									<FontAwesome5
								      name="trash"
								      solid
								      size={25}
								      color="red"
								      style={{marginHorizontal:10}}
								    />
								</TouchableOpacity>
							</View>
						</Spacer>

					)}
					ListFooterComponent={
						<Spacer>
							<Button 
								buttonStyle={styles.deleteBtn} 
								title="Delete Entire Collection"
								onPress={()=>{
									setLoading(true);
									dispatch(deleteCollection(collection._id))
								}}/>	
						</Spacer>
					}
				/>
				
			</SafeAreaView>
		)
	}
}


const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	deleteBtn:{
		backgroundColor:'red',
		borderRadius:25
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25
	},
	text:{
		color:'white',
		marginBottom:10
	},
	inputStyle:{
		color:'white',
		fontSize:18
	},
	labelStyle:{
		color:'white'
	},
	imageContainerStyle:{
		borderRadius:25, 
		overflow:'hidden'
	},
	imageContainer:{
		alignItems:'center'
	},
	image:{
		width:0.90*width,
		height:0.30*height
	},
	photo:{
		width:0.70*width,
		height:0.20*height
	},
	photosContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	}
})



export default CollectionEditScreen;