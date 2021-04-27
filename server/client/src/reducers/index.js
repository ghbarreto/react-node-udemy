import { combineReducers } from "redux";
import authReducer from "./authReducer";

// combining the reducers
export default combineReducers({
  // auth piece of state is being made by the authReducer
  auth: authReducer,
});
