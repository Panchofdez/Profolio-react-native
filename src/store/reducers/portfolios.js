const portfolios = (state=[], action)=>{
	switch(action.type){
		case 'LOAD_PORTFOLIOS':
			return [...action.portfolios];
		default:
			return state;
	}
}


export default portfolios;