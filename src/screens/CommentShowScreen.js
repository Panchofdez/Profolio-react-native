import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import {fetchMyPortfolio} from '../store/actions/myPortfolio' ;
import Loading from '../components/Loading';
import moment from 'moment';


const CommentShowScreen = ({navigation})=>{
	const {notification} = navigation.state.params;
	const portfolio = useSelector((state)=>state.currentUser.portfolio);
	const dispatch = useDispatch();
	useEffect(()=>{
		if(!portfolio){	
			dispatch(fetchMyPortfolio());
		}
	})
	
	if(portfolio){
		const comment = portfolio.comments.find((c)=>c._id === notification.comment);
		return(
			<SafeAreaView style={styles.container}>
				<TouchableOpacity onPress={()=>navigation.navigate('PortfolioShow', {itemId:notification.portfolio})}>
					<ListItem
						containerStyle={styles.commentContainer} 
						title={comment.author.name}
						titleStyle={styles.name}
						leftAvatar={{source:{uri:comment.author.profileImage}}}
						subtitle={
							<View style={{flex:1}}>		
								<Text style={styles.text}>{moment(comment.createdAt).fromNow()}</Text>
								<Text style={styles.text}>{comment.text}</Text>
							</View>
						}
					/>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}else{
		return <Loading/>;
	}
	
}




const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
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



export default CommentShowScreen;