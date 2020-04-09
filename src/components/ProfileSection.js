import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Image, Text, Button} from 'react-native-elements';
import Spacer from './Spacer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileSection = ({profileImage, name, recommendations})=>{
	return(
		<Spacer>
			<View style={styles.profile}>							
				<Image
					source={{ uri: profileImage}}
						style={styles.profileImage}
						containerStyle={styles.imageContainer}
				/>

				<View style={styles.userInfo}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.text}>{recommendations.length} Recommendations</Text>
					<Button 
						type="outline" 
						title="Recommend" 
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
		color:'white',
		fontWeight:'bold'
	},
	button:{
  		borderColor:'#00ad8e',
  		backgroundColor:'transparent',
  		alignSelf:'stretch',
  		marginVertical:10,
  		width:0.53 *width
  	}
})


export default ProfileSection;