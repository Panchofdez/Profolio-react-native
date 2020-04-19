import React , {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, View,Dimensions, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import Spacer from '../components/Spacer';
import Loading from '../components/Loading';
import {FontAwesome5 } from '@expo/vector-icons';
import {deleteCollectionPhoto} from '../store/actions/myPortfolio';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CollectionPhotosDeleteScreen= ({navigation})=>{
	const {collection}= navigation.state.params;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();	
	const deletePhoto=(id)=>{
		if(collection.photos.length===1){
			Alert.alert('Error','Your collection must have at least one photo');
			return;
		}
		setLoading(true);
		dispatch(deleteCollectionPhoto(collection._id, id.split('/')[1]));
	}
	if(loading){
		return <Loading/>
	}else{
		return (
			<SafeAreaView style={styles.container}>
				<Spacer>
					<FlatList
						data={collection.photos}
						keyExtractor={(item)=>item._id}
						renderItem={({item})=>(
							<Spacer>
								<View style={styles.photosContainer}>
									<Image source={{uri:item.image}} style={styles.photo} containerStyle={styles.imageContainerStyle}/>
									<Spacer>
										<TouchableOpacity onPress={()=>deletePhoto(item.imageId)}> 
											<FontAwesome5
										      name="trash"
										      solid
										      size={25}
										      color="#c74130"
										      style={{marginHorizontal:10}}
										    />
										</TouchableOpacity>
									</Spacer>
								</View>
							</Spacer>

						)}
					/>
				</Spacer>
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
	text:{
		color:'white',
		fontSize:25,
		margin:10
	},
	photo:{
		width:0.70*width,
		height:0.20*height
	},
	imageContainerStyle:{
		borderRadius:25,
		overflow:'hidden'
	},
	photosContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	}
});


export default CollectionPhotosDeleteScreen;