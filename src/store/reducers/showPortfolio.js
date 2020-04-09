const showPortfolio = (state={portfolio:null}, action)=>{
	switch(action.type){
		case "SHOW_PORTFOLIO":
			return {portfolio:action.portfolio};
		case "CLEAR_PORTFOLIO":
			return{portfolio:null};
		default:
			return state;
	}
}

export default showPortfolio;