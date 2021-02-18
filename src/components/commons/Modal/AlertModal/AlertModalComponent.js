import React, { useEffect } from "react";
// import PropTypes from "prop-types"
import "./AlertModalComponent.scss";

import ModalWrapper from "../ModalWrapper";

AlertModal.propTypes = {
  //   visible: PropTypes.bool.isRequired,
  //   onCancel: PropTypes.func.isRequired,
  //   handleKeyPress: PropTypes.func.isRequired,
  //   modalContent: PropTypes.oneOfType([
  //     PropTypes.element.isRequired,
  //     PropTypes.string.isRequired,
  //   ]),
  //   modalStyle: PropTypes.string.isRequired,
  //   modalTitle: PropTypes.string.isRequired,
  //   modalCheckCallback: PropTypes.func,
  //   modalCancelCallback: PropTypes.func,
};

export default function AlertModal(props) {
  const {
    visible,
    dark,
    onCancel,
    handleKeyPress,
    modalContent,
    modalStyle,
    modalTitle,
    modalCheckCallback = null,
    modalCancelCallback = null,
    id,
  } = props;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <ModalWrapper
      modalStyle={modalStyle}
      titleText={modalTitle}
      onClick={() => {
        onCancel(id);
        if (modalCancelCallback !== null) {
          modalCancelCallback();
        }
      }}
      visible={visible}
      dark={dark}
      wrapperCustomStyle={{
        overflow: "hidden",
        wordBreak: "keep-all",
        maxWidth: "500px",
      }}
    >
      <div className="alertModal__container">
        <div className="alertModal__wrapper">
          <div className="alertModal__content">
            {modalContent?.detail ? modalContent.detail : modalContent}
          </div>
          <div className="btn__wrapper">
            <button
              className="btn"
              onClick={() => {
                onCancel(id);
                return modalCheckCallback ? modalCheckCallback() : 1;
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
