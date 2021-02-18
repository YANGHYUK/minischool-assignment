import React from "react";
import { useSelector } from "react-redux";
import AlertModalContainer from "containers/commons/Modal/AlertModal";
import ContentModalContainer from "containers/commons/Modal/ContentModal";

const ModalContainer = () => {
  return (
    <>
      <ContentModalContainer />
      <AlertModalContainer />
    </>
  );
};

export default ModalContainer;
