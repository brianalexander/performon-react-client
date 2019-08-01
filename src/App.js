import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";

import Widget from "./components/Widget";

import { getUserAndDevices, setUUIDInputField } from "./actions/index";

/**
 * @component
 * @param {Object} props None
 */
const App = props => {
  console.log("App Rerendering....");

  const widgetJSXArray = props.deviceList.map(key => {
    return <Widget key={key} deviceHash={key} />;
  });

  const onSubmitHandler = event => {
    event.preventDefault();
    props.getUserAndDevices(props.uuidInputField);
  };

  return (
    <div style={containerRowStyle}>
      <form>
        <input
          onChange={e => props.setUUIDInputField(e.target.value)}
          value={props.uuidInputField}
          type="text"
        />
        <button type="submit" onClick={onSubmitHandler}>
          Submit
        </button>
      </form>
      <br />
      <div className="App" style={containerColStyle}>
        {widgetJSXArray}
      </div>
    </div>
  );
};

//
// CSS-IN-JS
//
/**
 * @const {Object}
 */
const containerRowStyle = {
  display: "flex",
  height: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center"
};

/**
 * @const {Object}
 */
const containerColStyle = {
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center"
};

function mapStateToProps(state) {
  const deviceList = state.deviceList;
  const uuidInputField = state.formsReducer.uuidInputField;

  return {
    deviceList,
    uuidInputField
  };
}

export default connect(
  mapStateToProps,
  { getUserAndDevices, setUUIDInputField }
)(App);
