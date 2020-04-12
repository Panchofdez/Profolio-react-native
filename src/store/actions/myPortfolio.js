import apiCall from '../../api/apiCall';
import {showPortfolio} from './portfolios';
import {addErrorMessage} from './errors';
import {navigate} from '../../navigationRef';

export const setUserPortfolio=(portfolio)=>{
	return{
		type:'SET_USER_PORTFOLIO',
		portfolio
	}
}

export const fetchMyPortfolio =()=>{
	return async dispatch=>{
		try{
			const response = await apiCall.get('/api/myportfolio');
			dispatch(setUserPortfolio(response.data))
		}catch(err){
			console.log(err.response.data.error);
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const createMyPortfolio = (data)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post('/api/myportfolio/create', data);
			console.log(response);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');

		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const editProfile = (data)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.put('/api/myportfolio/edit/profile', data);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const editAbout= (data)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.put('/api/myportfolio/edit/about', data);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const addCollection = (data)=>{
	return async dispatch=>{
		try{	
			console.log(data);
			const response = await apiCall.post('/api/myportfolio/collections', data);
			console.log(response);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error))
		}
	}
}

export const editCollection = (collection, id)=>{
	return async dispatch=>{
		try{
			console.log(collection);
			const response = await apiCall.put(`/api/myportfolio/collections/${id}`, collection);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));

		}
	}
}

export const deleteCollection = (id)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.delete(`/api/myportfolio/collections/${id}`);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
	
		}
	}
}

export const deleteCollectionPhoto =(id, photo_id)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.delete(`/api/myportfolio/collections/${id}/photos/${photo_id}`);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			
		}
	}
}