import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from './Spacer';


const NavLink =({navigation,text, route})=>{
	return (
		<TouchableOpacity onPress={()=>navigation.navigate(route)}>
			<Spacer>	
				<Text style={styles.link}>{text}</Text>
			</Spacer>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	link:{
		color:'#00ad8e'
	}
	
})


export default NavLink;