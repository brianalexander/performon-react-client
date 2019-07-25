import React from "react";
import DoughnutChart from "./DoughnutChart";

export default props => {
  return (
    <div
      className="mem-chart"
      style={{ display: "inline-block", float: "left" }}
    >
      <p>Memory Usage</p>
      <DoughnutChart usagePercentage={props.memUsage} />
      <div>Total Memory: {kBytesToGbytes(props.totalMem)} gb</div>
      <div>
        Free Memory:{" "}
        {kBytesToGbytes(calculateFreeMem(props.totalMem, props.memUsage))} gb
      </div>
    </div>
  );
};

function calculateFreeMem(totalMem, usage) {
  return totalMem - totalMem * (usage / 100);
}

function kBytesToGbytes(kBytes) {
  return Math.floor((kBytes / 1024 / 1024) * 100) / 100;
}
