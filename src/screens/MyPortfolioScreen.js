import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView, Dimensions, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Text, Button, Image, Header} from 'react-native-elements';
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
import {fetchMyPortfolio} from '../store/actions/myPortfolio';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MyPortfolioScreen = ({navigation})=>{
	const dispatch=useDispatch();
	const portfolio = useSelector((state)=>state.currentUser.portfolio)
	const [loading, setLoading] = useState(true)
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
						return(
						
							<View>
								<FlatList 
									horizontal 
									showsHorizontalScrollIndicator={false}
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
								<View style={styles.titleContainer}>								
									<Text h4 style={styles.text}>Timeline</Text>
									<TouchableOpacity onPress={()=>navigation.navigate('TimelineForm', {portfolio:portfolio})}>
										<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>	
									</TouchableOpacity>						
								</View>
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
		borderRadius:25
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
	}
});



export default MyPortfolioScreen;