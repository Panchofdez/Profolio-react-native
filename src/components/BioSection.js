import React from 'react';
import{View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from './Spacer';
import {Entypo, FontAwesome5} from '@expo/vector-icons';

const BioSection = ({about,location,type,birthday})=>{
	return(
		<Spacer>
			<View style={styles.about}>
				<Text style={styles.text} h4>About</Text>
				<Text style={styles.text}>
					<Entypo 
						name="location-pin" 
						size={25} 
						color="#00ad8e"
					/>  {location}
				</Text>
				<Text style={styles.text}>
					<FontAwesome5
						name="briefcase"
						size={20}
						color="#00ad8e"
					/>   {type}
				</Text>
				{birthday ? (
					<Text style={styles.text}>
						<FontAwesome5 
							name="birthday-cake" 
							size={20}
							color="#00ad8e"
							solid
						/>   {birthday}
				</Text>):null}
				<Text style={styles.text} >{about}</Text>
			</View>
		</Spacer>
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

	}
})


export default BioSection;