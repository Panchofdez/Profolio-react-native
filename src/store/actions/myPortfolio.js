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
			const response = await apiCall.post('/api/myportfolio/profile', data);
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
			const response = await apiCall.put('/api/myportfolio/profile', data);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const editAbout = (data)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.put('/api/myportfolio/about', data);
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
			const response = await apiCall.post('/api/myportfolio/collections', data);
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
			console.log(id);
			const response = await apiCall.delete(`/api/myportfolio/collections/${id}`);
			dispatch(setUserPortfolio(response.data));
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


export const createTimelinePost = (post)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.post('/api/myportfolio/timeline', post);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const editTimelinePost = (post, id)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.put(`/api/myportfolio/timeline/${id}`, post);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const deleteTimelinePost = (id)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.delete(`/api/myportfolio/timeline/${id}`);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const addVideo = (video)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post('/api/myportfolio/videos', video);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const editVideo = (video, id)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.put(`/api/myportfolio/videos/${id}`, video);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const deleteVideo = (id)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.delete(`/api/myportfolio/videos/${id}`);
			dispatch(setUserPortfolio(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const addSkills = (data)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post('/api/myportfolio/skills', data);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


export const addContactInfo = (data)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.put('/api/myportfolio/contactInfo', data);
			console.log(response.data);
			dispatch(setUserPortfolio(response.data));
			navigate('MyPortfolio');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}