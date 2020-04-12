import React from 'react';
import CreateForm from '../components/CreateForm';


const ProfileFormScreen = ({navigation})=>{
	const {portfolio} = navigation.state.params;
	return (	
		<CreateForm navigation={navigation} portfolio={portfolio} type="Edit" btnType="Change"/>
	)
}



export default ProfileFormScreen;