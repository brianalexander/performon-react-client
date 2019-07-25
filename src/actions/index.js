import axios from "axios";
import socket from "../utilities/socketConnection";
import actionTypes from "../actions/actionTypes";

const {
  SET_USER,
  ADD_DEVICE,
  SET_DEVICE,
  SET_DEVICE_ACTIVE,
  SET_DEVICE_INACTIVE
} = actionTypes;

export function getUserAndDevices(formUUID) {
  console.log("getUser called");
  return function(dispatch, getState) {
    return fetchUser(formUUID)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          dispatch(getDevices(formUUID));
          dispatch(handleSocketListener(formUUID))
            .then(() => {
              dispatch(setUser(response.data));
            })
            .catch(err => {
              console.log(err);
            });
        } else if (response.status === 404) {
          // TODO: clear user
          // TODO: clear devices
          // TODO: clear metrics
          // Show user not found notification
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

function handleSocketListener(newUUID) {
  return (dispatch, getState) => {
    const currentUserUUID = getState().userReducer.uuid;
    console.log(currentUserUUID);
    if (currentUserUUID !== newUUID) {
      socket.emit("unsubscribeFromUserUUID", currentUserUUID);
      console.log("unsubscribe emitted", currentUserUUID);
      socket.emit("subscribeToUserUUID", newUUID);

      // make then-able
      return Promise.resolve();
    }

    return Promise.reject("User hasn't changed.  Nothing to do.");
  };
}

function getDevices(userUUID) {
  return function(dispatch, getState) {
    return fetchDevices(userUUID)
      .then(response => {
        // console.log(response.data);
        for (let device of response.data) {
          device.isActive = false; // device is defaulted to inactive when loaded from database

          dispatch(setDevice(device));
          dispatch(addDevice(device.hashId));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function setUUIDInputField(uuid) {
  return { type: "SET_USER_UUID", payload: uuid };
}

export function setDeviceMetrics(data) {
  return { type: "SET_METRIC", payload: data };
}

function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

function addDevice(deviceHash) {
  return {
    type: ADD_DEVICE,
    payload: deviceHash
  };
}

function setDevice(device) {
  return {
    type: SET_DEVICE,
    payload: device
  };
}

export function setDeviceActive(deviceHash) {
  return {
    type: SET_DEVICE_ACTIVE,
    payload: deviceHash
  };
}

export function setDeviceInactive(deviceHash) {
  return {
    type: SET_DEVICE_INACTIVE,
    payload: deviceHash
  };
}

//
// API calls
//
function fetchUser(userUUID) {
  return axios({
    method: "get",
    url: `http://localhost:9090/v1/users/${userUUID}`,
    responseType: "json"
  });
}

function fetchDevices(userUUID) {
  return axios({
    method: "get",
    url: `http://localhost:9090/v1/users/${userUUID}/devices`,
    responseType: "json"
  });
}
