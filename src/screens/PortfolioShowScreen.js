import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationEvents} from 'react-navigation'
import {View, SafeAreaView, StyleSheet, Dimensions, FlatList,ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';
import {Text, Image, Button} from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Spacer from '../components/Spacer';
import CommentsSection from '../components/CommentsSection';
import ProfileSection from '../components/ProfileSection';
import ImageHeader from '../components/ImageHeader';
import BioSection from '../components/BioSection';
import MyDivider from '../components/Divider';
import TimelineSection from '../components/TimelineSection';
import {getPortfolio, clearPortfolio} from '../store/actions/portfolios';
import Loading from '../components/Loading';
import{MaterialCommunityIcons} from '@expo/vector-icons';
import VideosSection from '../components/VideosSection';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PortfolioShowScreen = ({navigation})=>{
	const {itemId} = navigation.state.params;
	const [portfolioId, setPortfolioId] = useState(itemId);
	const dispatch =useDispatch();
	useEffect(()=>{
		console.log('hi');
		dispatch(getPortfolio(itemId));
		return ()=>{
			console.log('cleared');
			dispatch(clearPortfolio());
		}
	},[itemId]);
	const portfolio = useSelector((state)=>state.showPortfolio.portfolio);

	if(portfolio){
		return(
			<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
				<NavigationEvents onDidFocus={()=>{
					if(portfolio._id !== itemId){
						dispatch(getPortfolio(itemId));
					}
				
				}}/>
				<FlatList
					ListHeaderComponent={
						<View>
							{portfolio.headerImage && (
								<ImageHeader image={portfolio.headerImage}/>
							)}
							
							<ProfileSection 
								portfolio={portfolio}
								navigation={navigation}		
								id={itemId}
								btnType='Recommend'		
							/>
							<MyDivider/>
							<Spacer>
								<Text style={styles.text} h4>About</Text>
							</Spacer>
							{(portfolio.about || portfolio.type || portfolio.location || portfolio.birthday) && (
								<BioSection
									portfolio={portfolio}
								/>
							)}
							
							<MyDivider/>
							<Spacer>
								<Text style={styles.text} h4>Work</Text>
							</Spacer>
						</View>
					}
					data={portfolio.collections}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>{
						const images = item.photos.map((photo)=>photo.image);
						return(
						
							<View>
								<Spacer/>
								<SliderBox
									images={images}
									sliderBoxHeight={450}
									dotColor="#00ad8e"
								/>
								<Spacer>
									<Text style={styles.name}>{item.title}</Text>
									<Text style={styles.text}>{item.description}</Text>
								</Spacer>
								<Spacer/>
							</View>
						
						)
					}}
					ListFooterComponent={
						<View>
							{portfolio.videos.length>0 && (
								<VideosSection videos={portfolio.videos}/>
							)}						
							<MyDivider/>
							<Spacer>
								<Text h4 style={styles.text}>Timeline</Text>
							</Spacer>
							{portfolio.timeline.length>0 &&(
								<TimelineSection timeline={portfolio.timeline}/>
							)}						
					        <MyDivider/>
					        <Spacer>
					        <View style={styles.titleContainer}>								
								<Text h4 style={styles.text}>Comments</Text>
								<TouchableOpacity onPress={()=>navigation.navigate('CommentForm')}>
									<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>	
								</TouchableOpacity>						
							</View>
					        </Spacer>
					        <CommentsSection comments={portfolio.comments} portfolioId={portfolio._id} navigation={navigation}/>
					    </View>
					}
				/>
			</SafeAreaView>
		)
	}else{
		return(
			<React.Fragment>
				<NavigationEvents onDidFocus={()=>{
					if(!portfolio || portfolio._id !== itemId){
						dispatch(getPortfolio(itemId));
					}
				}}/>
				<Loading/>
			</React.Fragment>

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
		fontSize:20,
		fontWeight:'bold',
		marginBottom:5,
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25,
	},
	titleContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		
	}
});



export default PortfolioShowScreen;