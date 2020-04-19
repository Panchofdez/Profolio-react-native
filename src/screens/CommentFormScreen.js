import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView,ScrollView, StyleSheet,TextInput, TouchableOpacity, Alert} from 'react-native';
import { Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {postComment} from '../store/actions/portfolios';
import {FontAwesome5}from '@expo/vector-icons';



const CommentFormScreen = ({navigation})=>{
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const user = useSelector((state)=>state.currentUser.user);
	const portfolio=useSelector((state)=>state.showPortfolio.portfolio);
	const handleSubmit = ()=>{
		if(user.userId===portfolio.userId){
			Alert.alert("Error","You can't comment on your own portfolio");
			return
		}
		if(!user.portfolio){
			Alert.alert('Error','You have to create your own portfolio first');
			return;
		}
		const data={
			text:comment
		}
		dispatch(postComment(portfolio._id, data));
	}
	return(
		<SafeAreaView style={styles.container}>
			<ScrollView keyboardShouldPersistTaps="handled">
	        	<Spacer>
		        	<TextInput
		        		multiline	
		        		numberOfLines={3}
		        		placeholder="Give your testimonial"
		        		style={styles.commentInput}
		        		value={comment}
		        		onChangeText={setComment}

		        	/>
		        	<Spacer/>
			     	<Button 
						buttonStyle={styles.button} 
						title="Post" 
						onPress={()=>handleSubmit()}
						icon={
							<FontAwesome5
						      name="check-circle"
						      solid
						      size={25}
						      color="white"
						      style={{marginHorizontal:10}}
						    />
						}
					/>	
	       		</Spacer>
	       </ScrollView>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	button:{
		backgroundColor:'#00ad8e',
		borderRadius:25
	},
	commentInput:{
		color:'white', 
		borderColor: 'white',
		borderBottomWidth: 0.75,
		fontSize:18
	},
})


export default CommentFormScreen;