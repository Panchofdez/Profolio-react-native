import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Dimensions, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, Text, Button} from 'react-native-elements';
import Spacer from './Spacer';
import {recommend, stopRecommending} from '../store/actions/portfolios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileSection = ({portfolio, navigation, btnType, id})=>{
	const dispatch =useDispatch();
	const {profileImage, name, recommendations} = portfolio;
	const user = useSelector((state)=>state.currentUser.user);
	const [recommending, setRecommending] =useState(false);
	useEffect(()=>{
		checkRecommendation();
	},[])
	const checkRecommendation = ()=>{
		const isRecommending = recommendations.find((id)=>id===user.userId);
		if(isRecommending){
			setRecommending(true);
		}else{
			return;
		}
	};
	return(
		<Spacer>
			<View style={styles.profile}>							
				<Image
					source={{ uri: profileImage}}
					style={styles.profileImage}
					containerStyle={styles.imageContainer}
					PlaceholderContent={<ActivityIndicator />}
				/>

				<View style={styles.userInfo}>
					<Text style={styles.name}>{name}</Text>
					<TouchableOpacity onPress={()=>navigation.navigate('Recommendations',{itemId:id})}>
						<Text style={styles.text}>{recommendations.length} Recommendations</Text>
					</TouchableOpacity>
					{btnType==='Recommend' && (
						<Button 
							type="outline" 
							title={recommending? 'Recommending' : 'Recommend'} 
							buttonStyle={recommending? styles.recommending : styles.recommend} 
							titleStyle={recommending? styles.recommendingTitle : styles.recommendTitle}
							onPress={()=>{
								if(recommending){
									dispatch(stopRecommending(id));
									setRecommending(false);
								}else{
									dispatch(recommend(id));
									setRecommending(true);
								}
								
							}}
						/>
					)}
					{btnType==='Share' &&(
						<Button 
							type="outline" 
							title={btnType} 
							buttonStyle={styles.recommend} 
							titleStyle={styles.recommendTitle}
						/>

					)}
					
				</View>
			</View>
		</Spacer>
	)
}


const styles = StyleSheet.create({
	profile:{
		display:'flex',
		flexDirection:'row',
		marginVertical:0.02*height
	},
	profileImage:{
		width:0.30*width

	},
	imageContainer:{
		overflow:'hidden',
		borderRadius:25   
	},
	userInfo:{
		justifyContent:'center',
		alignItems:'flex-start',
		width:0.55 *width,
		marginHorizontal:0.05*width
	},
	name:{
		fontSize:24,
		fontWeight:'bold',
		marginBottom:10,
		color:'white',
	},
	text:{
		marginBottom:10,
		color:'#00ad8e',
		fontWeight:'bold'
	},
	recommend:{
  		borderColor:'#00ad8e',
  		backgroundColor:'transparent',
  		alignSelf:'stretch',
  		marginVertical:10,
  		width:0.53 *width,
  		borderRadius:25
  	},
  	recommending:{
  		backgroundColor:'#00ad8e',
  		alignSelf:'stretch',
  		marginVertical:10,
  		width:0.53 *width,
  		borderRadius:25
  	},
  	recommendTitle:{
  		color:'#00ad8e'
  	},
  	recommendingTitle:{
  		color:'white'
  	}

})


export default ProfileSection;