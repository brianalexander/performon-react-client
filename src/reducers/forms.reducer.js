//
// Imports
//
import actionTypes from "../actions/actionTypes";

//
// Action Types
//
const { SET_USER_UUID } = actionTypes;

export default (state = { uuidInputField: "" }, action) => {
  switch (action.type) {
    case SET_USER_UUID:
      return { ...state, uuidInputField: action.payload };
    default:
      return state;
  }
};
