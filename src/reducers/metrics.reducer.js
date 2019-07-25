//
// Imports
//
import actionTypes from "../actions/actionTypes";

//
// Action Types
//
const { SET_METRIC } = actionTypes;

export default (state = {}, action) => {
  switch (action.type) {
    case SET_METRIC:
      return { ...state, [action.payload.deviceHash]: action.payload.metrics };
    default:
      return state;
  }
};

// {
//   cpuLoad: 0,
//   cpuTemp: 0,
//   memUsage: 0,
//   recievedBytes: 0,
//   sentBytes: 0,
//   upTime: 0,
//   isActive: false
// }
