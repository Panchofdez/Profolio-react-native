const initialState ={
	token:null
}

const currentUser = (state=initialState, action)=>{
	switch(action.type){
		case "SET_CURRENT_USER":
			return {
				isAuthenticated:Object.keys(action.user).length>0,
				user:action.user
			}
		case "FETCH_NOTIFICATIONS":
			return {...state, notifications:action.notifications};
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
}


export default currentUser;