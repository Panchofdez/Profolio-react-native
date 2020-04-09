const initialState ={
	isAuthenticated:false,
	user:{},
	portfolio:null
}

const currentUser = (state=initialState, action)=>{
	switch(action.type){
		case 'SET_CURRENT_USER':
			return {
				isAuthenticated:Object.keys(action.user).length>0,
			 	user:action.user
			};
		case 'SET_USER_PORTFOLIO':
			return {...state, portfolio:action.portfolio};
		default:
			return state;
	}
}


export default currentUser;