import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Badge} from 'react-native-elements';


const HorizontalScrollIndicator =(photos)=>{
	const FIXED_BAR_WIDTH = 280
	const BAR_SPACE = 10
	const numItems = photos.length
 	const itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
  	const animVal = new Animated.Value(0)
  	const bars = photos.forEach((image,i)=>{
  		const scrollBarVal = animVal.interpolate({
	        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
	        outputRange: [-itemWidth, itemWidth],
	        extrapolate: 'clamp',
	      })

		const thisBar = (
			<View
			  key={`bar${i}`}
			  style={[
			    styles.track,
			    {
			      width: itemWidth,
			      marginLeft: i === 0 ? 0 : BAR_SPACE,
			    },
			  ]}
			>
			  <Animated.View

			    style={[
			      styles.bar,
			      {
			        width: itemWidth,
			        transform: [
			          { translateX: scrollBarVal },
			        ],
			      },
			    ]}
			  />
			</View>
		)
		return thisBar;

  	})
	return(
		<View style={styles.container}>
			{bars}
		</View>
	)
}


const styles=StyleSheet.create({
	container:{
		backgroundColor:'transparent',
		display:'flex';
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	}
	track: {
		backgroundColor: '#ccc',
		overflow: 'hidden',
		height: 2,
	},
	bar: {
		backgroundColor: '#5294d6',
		height: 2,
		position: 'absolute',
		left: 0,
		top: 0,
	},
});




export default HorizontalScrollIndicator;


