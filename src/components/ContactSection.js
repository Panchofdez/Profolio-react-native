import React from 'react';
import {View, StyleSheet, Clipboard, ToastAndroid} from 'react-native';
import {SocialIcon,Button, Text} from 'react-native-elements';
import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import { Linking } from 'expo';
import Spacer from '../components/Spacer';

const ContactSection =({portfolio})=>{
	const handlePress=(string)=>{
		Clipboard.setString(string);
		ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
	};
	const handleFbLink =(username)=>{
		console.log(username);
		Linking.openURL(`https://www.facebook.com/${username}`);
	};
	const handleInstaLink = (username)=>{
		console.log(username);
		Linking.openURL(`https://www.instagram.com/${username}`);
	}
	return (
		<View style={{marginBottom:15}}>			
			{portfolio.email ? (
				<Spacer>
					<View style={styles.row}>
						<Button
							buttonStyle={styles.button}
							onPress={()=>handlePress(portfolio.email)}
							icon={
								<MaterialCommunityIcons 
									size={25}
									name="email"
									color="#00ad8e"
								/>
							}
						/>
						<Text style={styles.text}>{portfolio.email}   </Text>
					</View>
				</Spacer>
			): null}
			{portfolio.phone ?(
				<Spacer>
					<View style={styles.row}>
						<Button
							buttonStyle={styles.button}
							onPress={()=>handlePress(portfolio.phone)}
							icon={
								<FontAwesome
									size={25}
									name="phone"
									color="#00ad8e"
								/>
							}
						/>
						<Text style={styles.text}>{portfolio.phone}  </Text>
					</View>
				</Spacer>

			): null}
			{portfolio.facebook?(
				<Spacer>
					<View style={styles.row}>
						<SocialIcon
							type="facebook"
							button
							style={styles.socialBtn}
							fontSize={16}
							onPress={()=>handleFbLink(portfolio.facebook)}
						/>
						<Text style={styles.text}>{portfolio.facebook}  </Text>
					</View>
				</Spacer> 

			): null}
			{portfolio.instagram?(
				<Spacer>
					<View style={styles.row}>
						<SocialIcon
							type="instagram"
							button
							style={styles.socialBtn}
							fontSize={16}
							onPress={()=>handleInstaLink(portfolio.instagram)}
						/>
						<Text style={styles.text}>{portfolio.instagram}  </Text>
				</View>

				</Spacer>
			):null}
			
		</View>
	)
}



const styles = StyleSheet.create({
	button:{
		borderRadius:100,
		backgroundColor:'white',
		width:50,
		height:50,
		marginRight:10
	},
	socialBtn:{
		width:50,
		height:50,
		marginRight:10,
		borderRadius:100,
		marginLeft:0,
		marginBottom:0
	},
	row:{
		flexDirection:'row'
	},
	text:{
		color:'white',
		fontSize:16,
		marginTop:10,
		marginLeft:10
	}
});


export default ContactSection;
