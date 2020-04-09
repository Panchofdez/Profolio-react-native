import apiCall from '../../api/apiCall';
import {showPortfolio} from './portfolios';
import {addErrorMessage} from './errors';


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