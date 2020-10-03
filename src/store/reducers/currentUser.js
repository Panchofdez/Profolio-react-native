const initialState = {
  isAuthenticated: false,
  user: {},
  portfolio: null,
  notifications: [],
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user,
      };
    case "SET_USER_PORTFOLIO":
      return { ...state, portfolio: action.portfolio };
    case "FETCH_NOTIFICATIONS":
      return { ...state, notifications: [...action.notifications] };
    default:
      return state;
  }
};

export default currentUser;
