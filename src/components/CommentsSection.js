import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, ListItem} from 'react-native-elements';


const CommentsSection = ({comments})=>{
	return(
		<FlatList
			listKey={(item, index) => 'D' + index.toString()}
	    	data={comments}
	    	keyExtractor={(item)=>item._id}
	    	renderItem={({item})=>(
	    		<View style={styles.commentCard}>
	    			<ListItem
	    				containerStyle={styles.commentContainer} 
	    				title={item.author.name}
	    				titleStyle={styles.name}
	    				leftAvatar={{source:{uri:item.author.profileImage}}}
	    				bottomDivider
	    				subtitle={
	    					<View>
	    						<Text style={styles.text}>{item.createdAt}</Text>
	    						<Text style={styles.text}>{item.text}</Text>
	    					</View>
	    				}
	    			/>
	    		</View>

	    	)}
	    />

	)
}

const styles = StyleSheet.create({
	text:{
		color:'white',
		marginBottom:10
	},
	name:{
		color:'white',
		marginBottom:10,
		fontWeight:'bold'
	},
	commentContainer:{
		backgroundColor:'#161716',  
		alignItems:'flex-start'
	}
})
export default CommentsSection;