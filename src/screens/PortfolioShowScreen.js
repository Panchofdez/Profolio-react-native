import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, SafeAreaView, StyleSheet, Dimensions, FlatList,ActivityIndicator} from 'react-native';
import {Text, Image} from 'react-native-elements';
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PortfolioShowScreen = ({navigation})=>{
	const {itemId} = navigation.state.params;
	const dispatch =useDispatch();
	const portfolio = useSelector((state)=>state.showPortfolio.portfolio);
	useEffect(()=>{
		dispatch(getPortfolio(itemId));
		return ()=>{
			dispatch(clearPortfolio());
		}
	},[itemId])
	
	if(portfolio){
		return(
			<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
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
								btnTitle='Recommend'		
							/>
							<MyDivider/>
							<Spacer>
									<Text style={styles.text} h4>About</Text>
								</Spacer>
							<BioSection
								portfolio={portfolio}
							/>
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
							<MyDivider/>
							<Spacer>
								<Text h4 style={styles.text}>Timeline</Text>
							</Spacer>
							<TimelineSection timeline={portfolio.timeline}/>
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
			<Loading/>
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
});



export default PortfolioShowScreen;