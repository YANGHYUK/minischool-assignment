import createReducer from "store/createReducer";

export const types = {
  //show modal
  SHOW_MODAL: "modal/SHOW_MODAL",

  //hide modal
  HIDE_MODAL: "modal/HIDE_MODAL",
};

export const actions = {
  showModal: (payload) => ({ type: types.SHOW_MODAL, payload }),
  hideModal: (payload) => ({ type: types.HIDE_MODAL, payload }),
};

export const INITIAL_STATE = {
  data: {
    alert: false,
    confirm: false,
    chat: [],
    content: [],
    note: [],
    motionAlarm: [],
    modalContent: null,
    dark: false,
    modalStyle: "blueGradientStyle",
    modalTitle: "Wait!",
    modalCheckCallback: null,
    modalCancelCallback: null,
  },
};

const reducer = createReducer(INITIAL_STATE, {
  [types.SHOW_MODAL]: (state, action) => {
    const {
      modalName,
      modalContent,
      dark,
      modalStyle,
      modalTitle,
      modalCheckCallback,
      modalCancelCallback,
    } = action.payload;
    switch (modalName) {
      case "content":
      case "chat":
      case "note":
      case "motionAlarm":
        state.data[modalName].push({
          id: state.data[modalName].length,
          dark,
          modalContent,
          modalStyle,
          modalTitle,
          modalCheckCallback,
          modalCancelCallback,
        });
        break;
      default:
        state.data[modalName] = true;
        state.data.modalContent = modalContent;
        state.data.dark = dark;
        state.data.modalStyle = modalStyle;
        state.data.modalTitle = modalTitle;
        state.data.modalCheckCallback = modalCheckCallback;
        state.data.modalCancelCallback = modalCancelCallback;
        break;
    }
  },
  [types.HIDE_MODAL]: (state, action) => {
    const { modalName, id } = action.payload;
    switch (modalName) {
      case "content":
      case "chat":
      case "note":
      case "motionAlarm":
        if (id) {
          const index = state.data[modalName].findIndex(
            (item) => item.id === id
          );
          state.data[modalName].splice(index, 1);
        } else {
          state.data[modalName] = [];
        }
        break;
      default:
        state.data[modalName] = false;
        state.data.modalContent = null;
        state.data.dark = false;
        state.data.modalStyle = "blueGradientStyle";
        state.data.modalTitle = "Wait!";
        state.data.modalCheckCallback = null;
        state.data.modalCancelCallback = null;
        break;
    }
  },
});

export default reducer;
