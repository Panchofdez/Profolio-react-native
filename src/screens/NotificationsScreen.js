import React,{useState, useEffect} from'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Button,Text, Header, ListItem, Overlay} from 'react-native-elements'
import Spacer from '../components/Spacer';
import {getNotifications, readNotification, readAllNotifications, deleteNotification} from '../store/actions/currentUser';
import Loading from '../components/Loading';
import moment from 'moment';
import {FontAwesome5} from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NotificationsScreen = ({navigation})=>{
	const dispatch = useDispatch();
	const notifications = useSelector((state)=>state.currentUser.notifications);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedNotification, setSelectedNotification]=useState(null);
	useEffect(()=>{
		dispatch(getNotifications());
	},[])
	const handlePress = (notification)=>{
		console.log(notification);
		if(notification.comment){
			navigation.navigate('CommentShow',{notification});
			dispatch(readNotification(notification._id));
		}else{
			navigation.navigate('PortfolioShow', {itemId:notification.portfolio})
			dispatch(readNotification(notification._id));
		}
	}
	const handleLongPress = (id)=>{
		setIsVisible(true);
		setSelectedNotification(id);
	}
	if(notifications){
		return(
			<View style={styles.container}>
				<Header
					placement="left"
					containerStyle={{backgroundColor:'#161716', height:0.07*height}}
					centerComponent={{ text: 'Notifications', style: styles.headerTitle }}
					rightComponent={
						<TouchableOpacity onPress={()=>dispatch(readAllNotifications())}>
							<Text style={styles.headerSubTitle}>Mark all as read</Text>
						</TouchableOpacity>
					}

				/>
				{notifications.length>0 ? (
					<FlatList
						data={notifications.reverse()}
						keyExtractor={(item)=>item._id}
						renderItem={({item})=>{
							return(
								<TouchableOpacity 
									onLongPress={()=>handleLongPress(item._id)}
									onPress={()=>handlePress(item)}
								>
									<ListItem
										containerStyle={item.read ? styles.readContainer : styles.unreadContainer}
										leftAvatar={{source:{uri:item.profileImage}}}
										title={item.text}
										titleStyle={styles.name}
										subtitle={moment(item.createdAt).fromNow()}
										subtitleStyle={styles.text}
										bottomDivider

									/>
								</TouchableOpacity>

							)
						}}

					/>
				):(
					<Spacer>
						<Text style={styles.text} >No new notifications ... </Text>
					</Spacer>

				)}

				<Overlay
				  isVisible={isVisible}
				  borderRadius={25}
				  height={0.5*width}
				  height={0.10 * height}
				  onBackdropPress={() => setIsVisible(false)}
				  overlayBackgroundColor='#303330'
				>
				<Button 
				 	title="Delete Notification" 
				 	buttonStyle={styles.deleteBtn}
				 	icon={
						<FontAwesome5
					      name="trash"
					      solid
					      size={25}
					      color="white"
					      style={{marginHorizontal:10}}
					    />
					}
				 	onPress={()=>{
				 		setIsVisible(false);
				 		dispatch(deleteNotification(selectedNotification));
				 	}}
				 />
				 </Overlay>

			</View>
		)
	}else{
		return <Loading/>
	}
}



const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#161716',
		color:'white'
	},
	text:{
		color:'white',
		marginBottom:10,
		fontSize:18
	},
	name:{
		color:'white',
		marginBottom:10,
		fontWeight:'bold'
	},
	readContainer:{
		backgroundColor:'#161716',  
		alignItems:'flex-start'
	},
	unreadContainer:{
		backgroundColor: '#303330',  
		alignItems:'flex-start',
	},
	headerTitle:{
		color: '#00ad8e', 
		fontSize:20, 
		fontWeight:'bold', 
		marginBottom:25
	},
	headerSubTitle:{
		color: '#00ad8e',
		marginBottom:25,
		fontSize:16
	},
	deleteBtn:{
		backgroundColor:'#c74130',
		borderRadius:25,
		margin:10
	},
});


export default NotificationsScreen;