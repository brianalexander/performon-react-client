import io from "socket.io-client";
// import axios from "axios";

// get store handle to dispatch actions
import store from "../config/reduxStore";

// get action
import {
  setDeviceMetrics,
  setDeviceActive,
  setDeviceInactive
} from "../actions";

const socket = io.connect("http://localhost:8080");

const deviceTimeoutDict = {};

socket.on("performanceData", data => {
  console.log(data);

  restartDeviceTimeout(data.deviceHash);
  store.dispatch(setDeviceActive(data.deviceHash));
  store.dispatch(setDeviceMetrics(data));
});

socket.on("deviceBecameActive", data => {
  // set device data
});

export default socket;

function restartDeviceTimeout(deviceHash) {
  if (deviceHash in deviceTimeoutDict) {
    clearTimeout(deviceTimeoutDict[deviceHash]);
  }

  deviceTimeoutDict[deviceHash] = setTimeout(() => {
    console.log("setting device inactive", deviceHash);
    store.dispatch(setDeviceInactive(deviceHash));
  }, 5000);
}
