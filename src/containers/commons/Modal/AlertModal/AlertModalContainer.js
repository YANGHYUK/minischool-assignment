import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalActions } from "store/modules/modal";
import AlertModalComponent from "components/commons//Modal/AlertModal";

const AlertModalContainer = () => {
  const {
    visible,
    dark,
    modalContent,
    modalStyle,
    modalTitle,
    modalCheckCallback,
    modalCancelCallback,
  } = useSelector((state) => ({
    visible: state.modal.data.alert,
    dark: state.modal.data.dark,
    modalContent: state.modal.data.modalContent,
    modalStyle: state.modal.data.modalStyle,
    modalTitle: state.modal.data.modalTitle,
    modalCheckCallback: state.modal.data.modalCheckCallback,
    modalCancelCallback: state.modal.data.modalCancelCallback,
  }));

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(modalActions.hideModal({ modalName: "alert" }));
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleCancel();
      if (modalCheckCallback) {
        modalCheckCallback();
      }
    }
  };

  return modalContent && visible ? (
    <AlertModalComponent
      visible={visible}
      dark={dark}
      modalContent={modalContent}
      modalStyle={modalStyle}
      modalTitle={modalTitle}
      modalCheckCallback={modalCheckCallback}
      modalCancelCallback={modalCancelCallback}
      onCancel={handleCancel}
      handleKeyPress={handleKeyPress}
    />
  ) : null;
};

export default AlertModalContainer;
