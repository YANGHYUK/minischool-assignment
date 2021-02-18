import React from "react";
import ContentModalComponent from "components/commons/Modal/ContentModal";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalActions } from "store/modules/modal";

const ContentModalContainer = () => {
  const { content } = useSelector((state) => ({
    content: state.modal.data.content,
  }));
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(modalActions.hideModal({ modalName: "content", id }));
  };

  return content.length
    ? content.map((ele) => {
        return (
          <ContentModalComponent
            key={ele.id}
            id={ele.id}
            visible={content.length ? true : false}
            dark={ele.dark}
            Component={ele.modalContent}
            modalStyle={ele.modalStyle}
            modalTitle={ele.modalTitle}
            onCancel={handleCancel}
            modalCheckCallback={ele.modalCheckCallback}
            modalCancelCallback={ele.modalCancelCallback}
          />
        );
      })
    : null;
};

export default ContentModalContainer;
