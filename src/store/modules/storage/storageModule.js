import createReducer from "store/createReducer";

export const types = {
  // ON_STORAGE: "storage/ON_STORAGE",
  ON_STORAGE_SUCCESS: "storage/ON_STORAGE_SUCCESS",
};

export const actions = {
  // onStorage: (payload) => ({ type: types.ON_STORAGE, payload }),
};

export const INITIAL_STATE = {
  data: {
    persistItems: {},
  },
};

const reducer = createReducer(INITIAL_STATE, {
  [types.ON_STORAGE_SUCCESS]: (state, action) => {
    console.log({ action }, "persist@@#@#@#@");
    const {
      value,
      total_count = 0,
      items = 0,
      incomplete_results = false,
    } = action.payload;

    if (items.length) {
      let targetIndex = null;
      if (state.data.persistItems[value]) {
        state.data.persistItems[value] = state.data.persistItems[value].concat(
          items
        );
      } else {
        state.data.persistItems[value] = items;
      }
      // state.data.persistItems.forEach((target, index) => {
      //   if (target?.keyword === value) {
      //     targetIndex = index;
      //   }
      // });
      // if (targetIndex !== null) {
      //   state.data.persistItems[targetIndex].items = state.data.persistItems[
      //     targetIndex
      //   ].items.concat(items);
      // } else {
      //   state.data.persistItems = state.data.persistItems.concat({
      //     keyword: value,
      //     items,
      //   });
      // }
    }
  },
});

export default reducer;
