import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Text, Button, Input, ListItem} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {FontAwesome5 , MaterialCommunityIcons} from '@expo/vector-icons'

const WorkFormScreen = ({navigation})=>{
	const {portfolio}= navigation.state.params;
	return (
		<SafeAreaView style={styles.container}>
			<Spacer>
				<Text style={styles.text} h4>My Work</Text>
				<Text style={styles.text}>Showcase your work and/or projects through collections of photos and videos</Text>
			</Spacer>
			<Spacer>
				<Button 
					buttonStyle={styles.button} 
					title="Add a collection"
					onPress={()=>navigation.navigate('CollectionCreate')}
					icon={
					    <FontAwesome5
					      name="camera"
					      solid
					      size={25}
					      color="white"
					      style={{marginHorizontal:10}}

					    />

					}
				/>	
			</Spacer>
			<Spacer>
				<Button 
					buttonStyle={styles.button} 
					title="Add a video"
					icon={
					    <FontAwesome5
					      name="video"
					      solid
					      size={25}
					      color="white"
					      style={{marginHorizontal:10}}
					    />
					}
				/>	
			</Spacer>
			<Spacer>
				<Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Collections: </Text>
			</Spacer>
			<Spacer>
				<FlatList
					data={portfolio.collections}
					keyExtractor={(item)=>item._id}
					renderItem={({item})=>(
						<TouchableOpacity onPress={()=>navigation.navigate('CollectionEdit', {collection:item})}>
							<ListItem
								containerStyle={styles.collectionContainer} 
								leftAvatar={{source:{uri:item.photos[0].image}}}
								title={item.title}
								titleStyle={{color:'white'}}
								bottomDivider
								rightIcon={
									
										<MaterialCommunityIcons name="pencil-circle" size={35} color="#00ad8e"/>
									
								}
							/>
						</TouchableOpacity>
					)}
				/>
			</Spacer>
		</SafeAreaView>
	)
}



const styles= StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25
	},
	text:{
		color:'white',
		marginBottom:10
	},
	collectionContainer:{
		backgroundColor:'#161716',  
	}
});


export default WorkFormScreen;