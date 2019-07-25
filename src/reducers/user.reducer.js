//
// Imports
//
import actionTypes from "../actions/actionTypes";

//
// Action Types
//
const { SET_USER } = actionTypes;

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      // console.log("set_user reducer");
      // console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
