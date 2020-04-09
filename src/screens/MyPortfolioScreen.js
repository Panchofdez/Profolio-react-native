import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import {Text, Button, Image } from 'react-native-elements';
import Spacer from '../components/Spacer';
import CommentsSection from '../components/CommentsSection';
import ProfileSection from '../components/ProfileSection';
import ImageHeader from '../components/ImageHeader';
import BioSection from '../components/BioSection';
import MyDivider from '../components/Divider';
import TimelineSection from '../components/TimelineSection';
import {signout} from '../store/actions/currentUser';
import {fetchMyPortfolio} from '../store/actions/myPortfolio';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MyPortfolioScreen = ({navigation})=>{
	const dispatch=useDispatch();
	const portfolio = useSelector((state)=>state.currentUser.portfolio)
	useEffect(()=>{
		console.log('hello')
		dispatch(fetchMyPortfolio());
	},[portfolio])
	console.log(portfolio);
	if(portfolio){
		return(
			<SafeAreaView style={styles.container}>
				<Spacer>
					<Button title="Sign Out" onPress={()=>dispatch(signout())}/>
				</Spacer>
				<FlatList
					ListHeaderComponent={
						<View>
							<ImageHeader image={portfolio.headerImage}/>
							<ProfileSection 
								profileImage={portfolio.profileImage}
								name={portfolio.name}
								recommendations={portfolio.recommendations}
							/>
							<MyDivider/>
							<BioSection 
								about={portfolio.about}
								location={portfolio.location}
								type={portfolio.type}
								birthday={portfolio.birthday}
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
						return(
						
							<View style={{alignItems:'center'}}>
								<FlatList 
									horizontal 
									data={item.photos}
									keyExtractor={(item)=>item._id}
									renderItem={({item})=>(
										<Image 
											key={item._id} 
											source={{uri:item.image}} 
											style={styles.collectionPhoto}
											containerStyle={styles.photoContainer}
											PlaceholderContent={<ActivityIndicator />}
										/>
									)}

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
			<Text>Loading</Text>
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



export default MyPortfolioScreen;