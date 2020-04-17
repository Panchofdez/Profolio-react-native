import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import {getNotifications} from '../store/actions/currentUser';


const NotificationIcon = ({color})=>{
	const notifications = useSelector((state)=>state.currentUser.notifications);
	const dispatch=useDispatch();
	useEffect(()=>{
		dispatch(getNotifications());
	},[])
	
	const badgeValue =  notifications ? notifications.filter((n)=> n.read===false).length : 0;
	return (
		<View>
			<FontAwesome5 solid name="bell" size={30} color={color}/>
			{badgeValue >0 && (
				<Badge
					badgeStyle={styles.badge}
					textStyle={styles.badgeText}
					value={badgeValue}
					status="error"
					containerStyle={[
						styles.badgeContainer
						
					]}
				/>
			)}
		</View>
	);
};



const styles = StyleSheet.create({
  badge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18,
    backgroundColor:'#00ad8e'
  },
  badgeContainer: {
    position: 'absolute',
    top :-5,
	right:0,
	left: 20,
	bottom:0,
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0,
  },
});



export default NotificationIcon;