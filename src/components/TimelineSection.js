import React from 'react';
import {StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import Spacer from './Spacer';

const TimelineSection=({timeline})=>{
	const timelineData = timeline.map((post)=>(
		{title:post.title, description:post.text, time:post.date}
	));
	return(
		<Spacer>
			<Timeline
				style={styles.timeline}
				data={timelineData}
				circleSize={20}
				circleColor='#00ad8e'
				lineColor='#00ad8e'
				timeContainerStyle={{minWidth:52, maxWidth:75, marginTop: -5}}
				timeStyle={{textAlign: 'center', backgroundColor:'#00ad8e', color:'white', padding:5, borderRadius:13}}
				descriptionStyle={{color:'white'}}
				titleStyle={{color:'white'}}
				options={{
					style:{paddingTop:5}
				}}
				
	        />
	    </Spacer>
	)
}



const styles= StyleSheet.create({
	timeline: {
	    flex: 1,
	    marginTop:5
  	},
})


export default TimelineSection;