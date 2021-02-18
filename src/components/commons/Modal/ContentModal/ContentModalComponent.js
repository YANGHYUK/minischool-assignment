import React, { useEffect } from "react";
// import PropTypes from 'prop-types';
import "./ContentModalComponent.scss";

import ModalWrapper from "../ModalWrapper";

const ContentModals = (props) => {
  const {
    dark = false,
    visible,
    onCancel = null,
    // handleKeyPress,
    Component = null,
    id,
    modalStyle,
    modalTitle,
    modalCheckCallback = null,
    modalCancelCallback = null,
  } = props;
  useEffect(() => {
    if (Component === null) {
      onCancel(id);
    }
  }, []);

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
      dark={dark}
      visible={visible}
    >
      <div className="contentModals">
        {Component && (
          <Component
            modalCheckCallback={modalCheckCallback}
            modalCancelCallback={modalCancelCallback}
          />
        )}
      </div>
    </ModalWrapper>
  );
};

// ContentModals.propTypes = {
//     modalCheckCallback: PropTypes.func,
//     modalCancelCallback: PropTypes.func,
// };

export default ContentModals;
