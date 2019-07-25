import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import Info from "./Info";
import Cpu from "./Cpu";
import Mem from "./Mem";

const Widget = props => {
  const metrics =
    props.metrics === undefined
      ? {
          cpuLoad: 0,
          cpuTemp: 0,
          memUsage: 0,
          recievedBytes: 0,
          sentBytes: 0,
          upTime: 0
        }
      : props.metrics;
  const {
    osType,
    cpuModel,
    totalMem,
    numLogicalCores,
    cpuSpeed,
    isActive,
    hashId
  } = props.device;

  const {
    cpuLoad,
    cpuTemp,
    memUsage,
    recievedBytes,
    sentBytes,
    upTime
  } = metrics;

  console.log(hashId, "rendering...");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const measuredRef = useCallback(node => {
    if (node !== null) {
      console.log("ref callback");
      setDimensions({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height
      });
    }
  }, []);

  const widgetStyle = { display: "inline-block" };

  const pStyle = {
    color: "red",
    fontWeight: "bold",
    fontSize: "5em"
  };

  const overlayStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.25)",
    position: "absolute",
    height: dimensions.height,
    width: dimensions.width,
    justifyContent: "center",
    alignContent: "center",
    visibility: isActive ? "hidden" : "visible"
  };

  return (
    <div style={widgetStyle} ref={measuredRef}>
      <div className="overlay" style={overlayStyle}>
        <p style={pStyle}>OFFLINE</p>
      </div>
      <Cpu cpuLoad={cpuLoad} cpuTemp={cpuTemp} />
      <Mem totalMem={totalMem} memUsage={memUsage} />
      <Info
        osType={osType}
        upTime={upTime}
        cpuSpeed={cpuSpeed}
        cpuModel={cpuModel}
        numLogicalCores={numLogicalCores}
      />
    </div>
  );
};

function mapStateToProps(_, ownProps) {
  const id = ownProps.deviceHash;

  return state => {
    let metrics = state.metricsReducer[id];
    let device = state.devices[id];
    console.log(id, device);

    return { metrics, device };
  };
}

export default connect(
  mapStateToProps,
  {}
)(Widget);
