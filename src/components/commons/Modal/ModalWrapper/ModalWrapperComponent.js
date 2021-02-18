import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./ModalWrapperComponent.scss";
// import useWindowDimensions from "lib/useWindowDimensions"

import close from "styles/images/modal/close.png";

const ModalWrapper = (rest) => {
  const {
    drag = false,
    modalStyle = "noneStyle",
    dark = false,
    visible = false,
    titleText = "",
    children = "",
    onClick,
    wrapperCustomStyle = {},
    titleCustomStyle = {},
    contentCustomStyle = {},
  } = { ...rest };

  const nodeRef = useRef(null);

  const [animate, setAnimate] = useState(false);
  const [dim, setDim] = useState(false);
  useEffect(() => {
    setAnimate(visible);
    setDim(dark);
  }, []);

  const animation = animate && "animation";

  const dimmed = "";

  const [activeModal, setActiveModal] = useState(true);
  const onActiveModal = () => {
    setActiveModal(true);
  };

  const onInactiveModal = () => {
    setActiveModal(false);
  };

  const active = activeModal && "active";
  if (!animate) return null;

  return (
    <>
      <div
        className={`${dimmed} ${animation} ${active} blackout`}
        onClick={onClick}
      ></div>

      <div
        ref={nodeRef}
        className={`modalWrapper ${modalStyle} ${animation}`}
        style={
          ({ ...wrapperCustomStyle },
          {
            zIndex: `${activeModal ? 100 : 0}`,
          })
        }
      >
        <div className="modalTitle__wrapper">
          <div className="modalTitle__container" style={titleCustomStyle}>
            <span className="modalTitle--text">{titleText}</span>
            <img
              src={close}
              className="icon-closing"
              onClick={onClick}
              alt=""
            />
          </div>
        </div>
        <div className="modalContent__wrapper" style={contentCustomStyle}>
          {children}
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

ModalWrapper.propTypes = {
  modalStyle: PropTypes.string,
  visible: PropTypes.bool,
  titleText: PropTypes.string,
  onClick: PropTypes.func,
  wrapperCustomStyle: PropTypes.objectOf(PropTypes.string),
  titleCustomStyle: PropTypes.objectOf(PropTypes.string),
  contentCustomStyle: PropTypes.objectOf(PropTypes.string),
};

export default ModalWrapper;
