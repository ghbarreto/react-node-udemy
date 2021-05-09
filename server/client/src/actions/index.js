import axios from "axios";
import { FETCH_USER } from "./types";

// fetching the user model from mongodb
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  return dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  // posting information to route /api/stripe with the token.
  const res = await axios.post("/api/stripe", token);
  // updating the user model with the credits added.
  return dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  // submitting the survey that was created
  const res = await axios.post("/api/surveys", values);

  // adding the history object to navigate back to the surveys route
  history.push("/surveys");
  return dispatch({ type: FETCH_USER, payload: res.data });
};
