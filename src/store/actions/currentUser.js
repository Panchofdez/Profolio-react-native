import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';
import apiCall from '../../api/apiCall'
import {navigate} from '../../navigationRef';
import {addErrorMessage, clearErrorMessage} from './errors';


export const setCurrentUser = (user) => {
	return {
		type:"SET_CURRENT_USER",
		user
	}	
}


export const fetchNotifications = (notifications)=>{
	return {
		type:"FETCH_NOTIFICATIONS",
		notifications
	}
}

export const authUser = ()=>{
	return async dispatch=>{
		const token = await AsyncStorage.getItem('token');
		if(token){
			dispatch(setCurrentUser(jwtDecode(token)));
			navigate('Portfolios');
		}else{
			navigate('Signup');
		}
	}
}


export const signin =(type, formData)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post(`/api/${type}`, formData );
			const {token, ...user} = response.data;
			await AsyncStorage.setItem('token', token);
			dispatch(setCurrentUser(user));
			dispatch(clearErrorMessage())
			navigate('Portfolios');
		}catch(err){
			console.log(err.response.data.error)
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}



export const signout =()=>{
	return async dispatch=>{
		try{
			await AsyncStorage.removeItem('token');
  			dispatch(setCurrentUser({}));
  			navigate('loginFlow');
		}catch(err){
			console.log(err.response.data.error)
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const getUser=()=>{
	return async dispatch=>{
		try{
			const response = await apiCall.get('/api/user');
			dispatch(setCurrentUser(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const getNotifications = ()=>{
	return async dispatch =>{
		try{
			const response =  await apiCall.get('/api/notifications');
			dispatch(fetchNotifications(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const readNotification = (id) =>{
	return async dispatch=>{
		try{
			const response = await apiCall.put(`/api/notifications/notification/${id}`);
			dispatch(fetchNotifications(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const readAllNotifications =()=>{
	return async dispatch =>{
		try{
			const response = await apiCall.put('/api/notifications/readall');
			dispatch(fetchNotifications(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error))
		}
	}
}


export const deleteNotification=(id)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.delete(`/api/notifications/${id}`);
			dispatch(fetchNotifications(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}
