import React from "react";

export default props => {
  return (
    <div>
      <div>Sent: {Math.round(props.rx)} bytes</div>
      <div>Received: {Math.round(props.tx)} bytes</div>
    </div>
  );
};
