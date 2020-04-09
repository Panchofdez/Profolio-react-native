import apiCall from '../../api/apiCall';
import {addErrorMessage} from './errors';



export const loadPortfolios = (portfolios)=>{
	return{
		type:'LOAD_PORTFOLIOS',
		portfolios
	}
}

export const showPortfolio = (portfolio)=>{
	return{
		type:'SHOW_PORTFOLIO',
		portfolio
	}
}

export const clearPortfolio = ()=>{
	return{
		type:'CLEAR_PORTFOLIO'
	}
}

export const fetchPortfolios = ()=>{
	return async dispatch =>{
		try{
			const response = await apiCall.get('/api/portfolios');
			dispatch(loadPortfolios(response.data))
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}

export const getPortfolio = (id)=>{
	return async dispatch=>{
		try{
			console.log(id);
			const response = await apiCall.get(`/api/portfolios/${id}`);
			console.log(response.data);
			dispatch(showPortfolio(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data));
		}
	}
}