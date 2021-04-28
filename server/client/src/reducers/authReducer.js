// import the action type
import { FETCH_USER } from "../actions/types";
// create a reducer

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // returns the payload with the user model
      // or false if the user isnt logged in
      return action.payload || false;
    default:
      return state;
  }
}
