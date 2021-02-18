import React, { useState } from "react";

import Modal from "containers/commons/Modal";
import HomeContainer from "containers/Home";
import LoadingBar from "react-redux-loading-bar";
const Root = () => {
  return (
    <>
      <LoadingBar
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "#3D79B6",
          height: "20px",
          zIndex: 10000,
        }}
      />
      <Modal />
      <HomeContainer />
    </>
  );
};

export default Root;
