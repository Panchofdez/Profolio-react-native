import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import { WebView } from 'react-native-webview';
import Spacer from '../components/Spacer';
import {SimpleLineIcons} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const VideosSection = ({videos, showOverlay, selectVideo})=>{
	const webViews = videos.map((v)=>{
		const link = `https://www.youtube.com/embed/${v.link}?rel=0`;
		const iframe=`<iframe width="100%" height="100%" src=${link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>` 
		return(
			<View key={v._id} style={styles.videoContainer}>
				<WebView
			        originWhitelist={['*']}
			        
			        allowsFullscreenVideo={true}
			        source={{ html: iframe }}
			        style={{ height:height*0.26, width:width, backgroundColor:'transparent'}}
			    />
			    <Spacer>
			    	<View style={styles.videoInfoContainer}>
						<View style={{flex:1}}>
							<Text style={styles.name}>{v.title}</Text>
						</View>
						{showOverlay && (
							<TouchableOpacity onPress={()=>{
								showOverlay(true);
								selectVideo(v);
							}}>
								<SimpleLineIcons name="options-vertical" size={25} color='white'/>
							</TouchableOpacity>

						)}
					</View>
					<View style={{flex:1, flexDirection:'row'}}>					
						<Text style={styles.text}>{v.description}</Text>
					</View> 
				</Spacer>
				<Spacer/>
			</View>
		)

	}) 
	return(
		<View>
			{webViews}
		</View>
	)
}



const styles= StyleSheet.create({
	name:{
		fontSize:20,
		fontWeight:'bold',
		marginBottom:5,
		color:'white'
	},
	text:{
		marginVertical:5,
		color:'white'
	},
	videoInfoContainer:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'flex-start'
		
	},
	videoContainer:{
		shadowOpacity:1,
		shadowRadius:5,
		shadowColor:'black',
		shadowOffset:{width:1, height:1},
		elevation:10,
		backgroundColor:'#181a18', 
		marginBottom:30
	}
});



export default VideosSection;
