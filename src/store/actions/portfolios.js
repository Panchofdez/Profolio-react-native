import apiCall from "../../api/apiCall";
import { addErrorMessage } from "./errors";
import { navigate } from "../../navigationRef";

export const loadPortfolios = (portfolios) => {
  return {
    type: "LOAD_PORTFOLIOS",
    portfolios,
  };
};

export const showPortfolio = (portfolio) => {
  return {
    type: "SHOW_PORTFOLIO",
    portfolio,
  };
};

export const clearPortfolio = () => {
  return {
    type: "CLEAR_PORTFOLIO",
  };
};

export const fetchRecommendations = (recommendations, recommending) => {
  return {
    type: "FETCH_RECOMMENDATIONS",
    recommendations,
    recommending,
  };
};

export const fetchPortfolios = () => {
  return async (dispatch) => {
    try {
      const response = await apiCall.get("/api/portfolios");
      dispatch(loadPortfolios(response.data));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const getPortfolio = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.get(`/api/portfolios/${id}`);
      dispatch(showPortfolio(response.data));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const getRecommendations = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.get(
        `/api/portfolios/${id}/recommendations`
      );
      const { recommendations, recommending } = response.data;
      dispatch(fetchRecommendations(recommendations, recommending));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const postComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.post(
        `/api/portfolios/${id}/comments`,
        comment
      );
      console.log(response.data);
      dispatch(showPortfolio(response.data));
      navigate("PortfolioShow", { itemId: id });
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const deleteComment = (id, comment_id) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.delete(
        `/api/portfolios/${id}/comments/${comment_id}`
      );
      dispatch(showPortfolio(response.data));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const recommend = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.post(`/api/portfolios/${id}/recommend`);
      console.log(response.data);
      dispatch(showPortfolio(response.data));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};

export const stopRecommending = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiCall.post(`/api/portfolios/${id}/unrecommend`);
      console.log(response.data);
      dispatch(showPortfolio(response.data));
    } catch (err) {
      dispatch(addErrorMessage(err.response.data.error));
    }
  };
};
