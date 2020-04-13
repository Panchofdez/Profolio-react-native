import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import Spacer from './Spacer';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const TimelineSection=({timeline, type, navigation})=>{
	let timelineData=[];
	if(type==="myPortfolio"){
		timelineData=timeline.map((post)=>(
			{title:post.title, description:post.text, time:post.date, icon:(
				<TouchableOpacity onPress={()=>navigation.navigate('TimelineEditForm', {post:post})}>
					<MaterialCommunityIcons name="pencil-circle" size={30} color="white"/>	
				</TouchableOpacity>	
			)}
		));
	}else{
		timelineData = timeline.map((post)=>(
			{title:post.title, description:post.text, time:post.date}
		));
	}
	if(type==='myPortfolio'){
		return(
			<Spacer>
				<Timeline
					style={styles.timeline}
					data={timelineData}
					circleSize={30}
					circleColor='#00ad8e'
					lineColor='#00ad8e'
					timeContainerStyle={{minWidth:75, maxWidth:75, marginTop: -5}}
					timeStyle={{textAlign: 'center', backgroundColor:'#00ad8e', color:'white', padding:5, borderRadius:13}}
					descriptionStyle={{color:'white'}}
					eventDetailStyle={{marginLeft:5}}
					titleStyle={{color:'white'}}
					innerCircle={type==='myPortfolio'? 'icon' : null}
					
		        />
		    </Spacer>
		)
	}else{
		return(
			<Spacer>
				<Timeline
					style={styles.timeline}
					data={timelineData}
					circleSize={20}
					circleColor='#00ad8e'
					lineColor='#00ad8e'
					timeContainerStyle={{minWidth: 75, maxWidth:75,marginTop: -5}}
					timeStyle={{textAlign: 'center', backgroundColor:'#00ad8e', color:'white', padding:5, borderRadius:13}}
					descriptionStyle={{color:'white'}}
					eventDetailStyle={{marginLeft:5}}
					titleStyle={{color:'white'}}
					
		        />
		    </Spacer>
		)
	}
	
}



const styles= StyleSheet.create({
	timeline: {
	    flex: 1,
	    marginTop:5
  	},
})


export default TimelineSection;