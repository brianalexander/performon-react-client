//
// Imports
//
import actionTypes from "../actions/actionTypes";

//
// Action Types
//
const {
  SET_DEVICE,
  ADD_DEVICE,
  DELETE_DEVICE,
  SET_DEVICE_ACTIVE,
  SET_DEVICE_INACTIVE
} = actionTypes;

export function devices(state = {}, action) {
  switch (action.type) {
    case SET_DEVICE: {
      const copy = { ...state };
      copy[action.payload.hashId] = action.payload;
      return copy;
    }
    case DELETE_DEVICE: {
      const copy = { ...state };
      delete copy[action.payload];
      return copy;
    }
    case SET_DEVICE_ACTIVE: {
      const device = { ...state[action.payload] };
      device.isActive = true;
      const copy = { ...state, [action.payload]: device };
      return copy;
    }
    case SET_DEVICE_INACTIVE: {
      const device = { ...state[action.payload] };
      device.isActive = false;
      const copy = { ...state, [action.payload]: device };
      return copy;
    }
    default:
      return state;
  }
}

export function deviceList(state = [], action) {
  let copy;
  switch (action.type) {
    case ADD_DEVICE:
      copy = [...state];
      copy.push(action.payload);
      return copy;
    default:
      return state;
  }
}
