import { combineReducers } from "redux";
import authReducer from "./authReducer";
// redux form (import it first in the reducer)
import { reducer as reduxForm } from "redux-form";

// combining the reducers
export default combineReducers({
  // auth piece of state is being made by the authReducer
  auth: authReducer,
  form: reduxForm,
});
