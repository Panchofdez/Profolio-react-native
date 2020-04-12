const initialState={
	portfolio:null, 
	recommendations:[],
	recommending:[] 
}

const showPortfolio = (state=initialState, action)=>{
	switch(action.type){
		case "SHOW_PORTFOLIO":
			return {portfolio:action.portfolio, recommendations:[], recommending:[]};
		case "CLEAR_PORTFOLIO":
			return initialState;
		case "FETCH_RECOMMENDATIONS":
			return {...state, recommendations:[...action.recommendations], recommending:[...action.recommending]};
		default:
			return state;
	}
}

export default showPortfolio;