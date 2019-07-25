import React from "react";
import DoughnutChart from "./DoughnutChart";

export default props => {
  return (
    <div
      className="cpu-chart"
      style={{ display: "inline-block", float: "left" }}
    >
      <p>CPU Load</p>
      <DoughnutChart usagePercentage={props.cpuLoad} />
      <div>CPU Temp: {props.cpuTemp}F</div>
    </div>
  );
};
