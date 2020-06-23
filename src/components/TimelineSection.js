import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from './Spacer';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const TimelineSection=({timeline, type, navigation})=>{
	if(type==='myPortfolio'){
		return(
			<View>
				<FlatList
					data={timeline}
					keyExtractor={(p)=>p._id}
					showsVerticalScrollIndicator={false}
					renderItem={({item})=>{
						return(
							<View style={{borderLeftWidth:3, borderColor:'#00ad8e', marginLeft:30}}>
								<View style={styles.timelineInfoContainer}>
									<Text style={{fontSize:18, color:'white', fontWeight:'bold', marginBottom:5}}>{item.title}  </Text>
									<Text style={{color:'white', fontWeight:'bold',marginBottom:5}}>{item.date}  </Text>
									<Text style={{color:'white',  marginBottom:5}}>{item.text}   </Text>
								</View>
								<View style={{height:35, width:35, borderRadius:25, backgroundColor: '#00ad8e', position:'absolute', left:-19, justifyContent:'center', alignItems:'center'}}>
									<TouchableOpacity onPress={()=>navigation.navigate('TimelineEditForm', {post:item})}>
										<MaterialCommunityIcons name="pencil-circle" size={33} color="white"/>	
									</TouchableOpacity>	
								</View>
							</View>
							
						)
					}}
				/>	
				<Spacer/>    
			</View>
		)
	}else{
		return(
			<View>
				<FlatList
					data={timeline}
					keyExtractor={(p)=>p._id}
					showsVerticalScrollIndicator={false}
					renderItem={({item})=>{
						return(
							<View style={{borderLeftWidth:3, borderColor:'#00ad8e', marginLeft:30}}>
								<View style={styles.timelineInfoContainer}>
									<Text style={{fontSize:18, color:'white', fontWeight:'bold', marginBottom:5}}>{item.title}     </Text>
									<Text style={{color:'white', fontWeight:'bold',marginBottom:5}}>{item.date}     </Text>
									<Text style={{color:'white',  marginBottom:5}}>{item.text}   </Text>
								</View>
								<View style={{height:30, width:30, borderRadius:25, backgroundColor: '#00ad8e', position:'absolute', left:-17, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'white'}}>

								</View>
							</View>
						)
					}}
				/>	     
				<Spacer/>
		 	</View>
		)
	}
	
}



const styles= StyleSheet.create({
	timeline: {
	    flex: 1,
	    marginTop:5
  	},
  	timelineInfoContainer:{
  		marginLeft:30, 
  		marginRight:10, 
  		padding:20,
  		marginBottom:30,
  		alignItems:'flex-start',
		borderRadius:15,
		backgroundColor:'#181a18',
		overflow:'hidden',
		shadowOpacity:0.8,
		shadowRadius:3,
		shadowColor:'black',
		shadowOffset:{width:0, height:1},
		elevation:10
  	}
})


export default TimelineSection;

