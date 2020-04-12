import React from 'react';
import {StyleSheet, Dimensions, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image, Text, Button} from 'react-native-elements';
import Spacer from './Spacer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileSection = ({portfolio, navigation, btnTitle, id})=>{
	const {profileImage, name, recommendations} = portfolio;
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
					<Button 
						type="outline" 
						title={btnTitle} 
						buttonStyle={styles.button} 
						titleStyle={{color:'#00ad8e'}}

					/>
					
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
	button:{
  		borderColor:'#00ad8e',
  		backgroundColor:'transparent',
  		alignSelf:'stretch',
  		marginVertical:10,
  		width:0.53 *width,
  		borderRadius:25
  	}
})


export default ProfileSection;