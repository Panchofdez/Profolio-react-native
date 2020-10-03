import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import portfolios from "./portfolios";
import showPortfolio from "./showPortfolio";

const rootReducer = combineReducers({
  currentUser,
  errors,
  portfolios,
  showPortfolio,
});

export default rootReducer;
