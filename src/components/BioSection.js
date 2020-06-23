import React from 'react';
import{View, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from './Spacer';
import {Entypo, FontAwesome5} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BioSection = ({portfolio})=>{
	const {location, type,birthday, about} = portfolio;
	return(
		<View style={styles.about}>
			
			{type && (
				<Text style={styles.text}>
					<FontAwesome5
						name="briefcase"
						size={21}
						color="#00ad8e"
					/>   {type}
				</Text>
			)}		
			{location && (
				<Text style={styles.text}>
					<Entypo 
						name="location" 
						size={24} 
						color="#00ad8e"
					/>  {location}
				</Text>
			)}	
			{birthday ? (
				<Text style={styles.text}>
					<FontAwesome5 
						name="birthday-cake" 
						size={25}
						color="#00ad8e"
						solid
					/>   {birthday}
			</Text>):null}
			{about ? <Text style={styles.text} >{about}</Text>: null}
		</View>
	)
}


const styles=StyleSheet.create({
	text:{
		marginBottom:12,
		color:'white'
	},
	about:{
		justifyContent:'flex-start',
		alignItems:'flex-start',
		marginHorizontal:0.05*width,
		marginBottom:0.03 *width

	}
})


export default BioSection;