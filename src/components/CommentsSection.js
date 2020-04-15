import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import {deleteComment} from '../store/actions/portfolios';
import moment from "moment";


const CommentsSection = ({comments, portfolioId})=>{
	const dispatch = useDispatch();
	const user = useSelector((state)=>state.currentUser.user)
	return(
		<FlatList
			listKey={(item, index) => 'D' + index.toString()}
	    	data={comments}
	    	keyExtractor={(item)=>item._id}
	    	renderItem={({item})=>{
	    		return(
	    			<View style={styles.commentCard}>
		    			<ListItem
		    				containerStyle={styles.commentContainer} 
		    				title={item.author.name}
		    				titleStyle={styles.name}
		    				leftAvatar={{source:{uri:item.author.profileImage}}}
		    				bottomDivider
		    				subtitle={
		    					<View style={{flex:1}}>		
		    						<Text style={styles.text}>{moment(item.createdAt).fromNow()}</Text>
		    						<Text style={styles.text}>{item.text}</Text>
		    					</View>
		    				}
		  
		    				rightIcon={item.author.id===user.userId ? (
		    					<TouchableOpacity onPress={()=>dispatch(deleteComment(portfolioId,item._id))}> 
									<FontAwesome5
								      name="trash"
								      solid
								      size={20}
								      color="#c74130"
								      style={{marginHorizontal:10}}
								    />
								</TouchableOpacity>
		    				): null}
		    			/>
		    		</View>
		    	)

	    	}}
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