import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ size }) => {
  return (
    <div>
      <CircularProgress size={size} disableShrink />
    </div>
  );
};

export default Loading;
