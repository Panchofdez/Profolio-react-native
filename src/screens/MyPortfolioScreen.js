import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView, Dimensions, FlatList, ActivityIndicator, TouchableOpacity, Animated} from 'react-native';
import {Text, Button, Image, Header, Overlay} from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Spacer from '../components/Spacer';
import CommentsSection from '../components/CommentsSection';
import ProfileSection from '../components/ProfileSection';
import ImageHeader from '../components/ImageHeader';
import BioSection from '../components/BioSection';
import MyDivider from '../components/Divider';
import TimelineSection from '../components/TimelineSection';
import CreateForm from '../components/CreateForm';
import Loading from '../components/Loading';
import {signout} from '../store/actions/currentUser';
import {fetchMyPortfolio, deleteCollection} from '../store/actions/myPortfolio';
import {MaterialCommunityIcons, SimpleLineIcons, FontAwesome5} from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MyPortfolioScreen = ({navigation})=>{
	const dispatch=useDispatch();
	const portfolio = useSelector((state)=>state.currentUser.portfolio)
	const [loading, setLoading] = useState(true)
	const [isVisible, setIsVisible] = useState(false);
	const [selectedCollection, setSelectedCollection] =useState(null);
	const scrollX = new Animated.Value(0)
	let position = Animated.divide(scrollX, width);
	useEffect(()=>{
		fetch();
	},[]);
	const fetch=async()=>{
		try{
			await dispatch(fetchMyPortfolio());
			setLoading(false);
		}catch(err){
			console.log(err);
			return;
		}
	}
	if(loading){
		return (
			<Loading/>
		)
	}
	else if(portfolio){
		return(
			<SafeAreaView style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<View>
							<View style={styles.header}>
								<TouchableOpacity onPress={()=>dispatch(signout())}>
									<Text style={styles.signout}>Sign Out</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>navigation.navigate('ProfileForm', {portfolio:portfolio})}>
									<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e" style={{marginHorizontal:0.05*width}} />
								</TouchableOpacity>
							</View>
							{portfolio.headerImage && (
								<ImageHeader image={portfolio.headerImage}/>
							)}
							
							<ProfileSection 
								portfolio={portfolio}
								btnTitle="Share"
								navigation={navigation}
								id={portfolio._id}
							/>
							<MyDivider/>
							<Spacer>
								<View style={styles.titleContainer}>							
									<Text style={styles.text} h4>About</Text>
									<TouchableOpacity onPress={()=>navigation.navigate('AboutForm', {portfolio:portfolio})}>
										<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>
									</TouchableOpacity>			
								</View>
							</Spacer>
							<BioSection 
								portfolio={portfolio}
							/>
							<MyDivider/>
							<Spacer>
								<View style={styles.titleContainer}>									
									<Text style={styles.text} h4>Work</Text>
									<TouchableOpacity onPress={()=>navigation.navigate('WorkForm', {portfolio:portfolio})}>
										<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>
									</TouchableOpacity>
								</View>
							</Spacer>

						</View>
					}
					data={portfolio.collections}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>{
						const images = item.photos.map((photo)=>photo.image);
						return(
						
							<View>
								<SliderBox
									images={images}
									sliderBoxHeight={450}
									dotColor="#00ad8e"
								/>
								<Spacer>
									<View style={styles.collectionInfoContainer}>
										<View>
											<Text style={styles.name}>{item.title}</Text>
											<Text style={styles.text}>{item.description}</Text>
										</View>
									
										<TouchableOpacity onPress={()=>{
											setIsVisible(true);
											setSelectedCollection(item);
										}}>
											<SimpleLineIcons name="options-vertical" size={30} color='white'/>
										</TouchableOpacity>
									
									</View>
								</Spacer>
								<Spacer/>
							</View>
						
						)
					}}
					ListFooterComponent={
						<View>
							<Overlay
							  isVisible={isVisible}
							  borderRadius={25}
							  height={0.5*width}
							  height={0.23 * height}
							  onBackdropPress={() => setIsVisible(false)}
							>
								<View>
								 <Button 
								 	title="Edit Collection" 
								 	buttonStyle={styles.button}
								 	onPress={()=>{
								 		setIsVisible(false);
								 		navigation.navigate('CollectionEdit', {collection: selectedCollection});

								 	}}
								 />
								 <Button 
								 	title="Choose Photos to Delete" 
								 	buttonStyle={styles.button}
								 	onPress={()=>{
								 		setIsVisible(false);
								 		navigation.navigate('CollectionPhotosDelete', {collection: selectedCollection})
								 	}}
								 />
								 <Button 
								 	title="Delete Entire Collection" 
								 	buttonStyle={styles.deleteBtn}
								 	icon={
										<FontAwesome5
									      name="trash"
									      solid
									      size={25}
									      color="white"
									      style={{marginHorizontal:10}}
									    />
									}
								 	onPress={()=>{
								 		setIsVisible(false);
								 		setLoading(true);
								 		dispatch(deleteCollection(selectedCollection._id))
								 		setLoading(false);
								 	}}
								 />
								</View>
							</Overlay>
							<MyDivider/>
							<Spacer>
								<View style={styles.titleContainer}>								
									<Text h4 style={styles.text}>Timeline</Text>
									<TouchableOpacity onPress={()=>navigation.navigate('TimelineForm')}>
										<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>	
									</TouchableOpacity>						
								</View>
							</Spacer>
							<TimelineSection timeline={portfolio.timeline} type="myPortfolio" navigation={navigation}/>
					        <Spacer/>
					        <MyDivider/>
					        <Spacer>
					        	<Text h4 style={styles.text}>Comments</Text>
					        </Spacer>
					        <CommentsSection comments={portfolio.comments}/>
					    </View>
					}
				/>
			</SafeAreaView>
		)
	}else{
		return(
			<CreateForm type="Create" btnType="Add"/>
			
		)
	}
}



const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	text:{
		marginBottom:5,
		color:'white'
	},
	collectionPhoto:{
		height:0.50*height,
		width:width,
	},
	photoContainer:{
		marginVertical:10
	},
  	name:{
		fontSize:24,
		fontWeight:'bold',
		marginBottom:5,
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25,
		margin:10
	},
	deleteBtn:{
		backgroundColor:'#c74130',
		borderRadius:25,
		margin:10
	},
	titleContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		
	},
	header:{
		display:'flex', 
		flexDirection: 'row', 
		justifyContent:'space-between', 
		alignItems:'center', 
		height:0.07*height
	},
	signout:{
		fontSize:18, 
		color:'#00ad8e', 
		marginHorizontal:0.05*width
	},
	collectionInfoContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'flex-start'
		
	}
});



export default MyPortfolioScreen;