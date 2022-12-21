import React from "react";

const style = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
};

export const Loader = () => {
  return <div style={style}>A moment please ...</div>;
};
