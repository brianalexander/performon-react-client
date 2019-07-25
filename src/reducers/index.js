import { combineReducers } from "redux";
import formsReducer from "./forms.reducer";
import { devices, deviceList } from "./devices.reducer";
import userReducer from "./user.reducer";
import metricsReducer from "./metrics.reducer";

export default combineReducers({
  formsReducer,
  userReducer,
  devices,
  deviceList,
  metricsReducer
});
