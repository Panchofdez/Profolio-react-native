import React from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ImageHeader =({image})=>{
	return(
		<Image
			source={{ uri: image}}
			style={styles.headerImage}
			PlaceholderContent={<ActivityIndicator />}
		/>
	)
}


const styles= StyleSheet.create({
	headerImage:{
		width:width,
		height:0.25*height
	},
})


export default ImageHeader;