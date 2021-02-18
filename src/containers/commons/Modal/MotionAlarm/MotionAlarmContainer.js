import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalActions } from "store/modules/modal";
import MotionAlarmComponent from "components/commons/Modal/MotionAlarm";
export default function MotionAlarmContainer() {
  const { motionAlarm } = useSelector((state) => ({
    motionAlarm: state.modal.data.motionAlarm,
  }));

  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(modalActions.hideModal({ modalName: "motionAlarm", id }));
  };

  if (motionAlarm && motionAlarm.length) {
    return motionAlarm.map((ele) => {
      return (
        <MotionAlarmComponent
          key={ele.id}
          id={ele.id}
          visible={motionAlarm.length ? true : false}
          dark={ele.dark}
          modalContent={ele.modalContent}
          modalStyle={ele.modalStyle}
          modalTitle={ele.modalTitle}
          onCancel={handleCancel}
          modalCheckCallback={ele.modalCheckCallback}
          modalCancelCallback={ele.modalCancelCallback}
        />
      );
    });
  }
  return null;
}
