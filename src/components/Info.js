import React from "react";
import moment from "moment";

export default props => {
  const infoChartStyles = { display: "inline-block", float: "left" };

  return (
    <div id="info-chart" style={infoChartStyles}>
      <h3>Operating System</h3>
      <div>{props.osType}</div>
      <h3>Time Online</h3>
      <div>{moment.duration(props.upTime * 1000).humanize()}</div>
      <h3>Processor information</h3>
      <div>
        <strong>Type:</strong> {props.cpuModel}
      </div>
      <div>
        <strong>Number of Cores:</strong> {props.numCores}
      </div>
      <div>
        <strong>Clock Speed:</strong> {props.cpuSpeed} Ghz
      </div>
    </div>
  );
};
