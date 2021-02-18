import createReducer from "store/createReducer";

export const types = {
  // screen loading..
  IS_LOADING: "base/IS_LOADING",
};

export const actions = {
  isLoading: (payload) => ({ type: types.IS_LOADING, payload }),
  // fetchSuccess: (payload) => ({ type: types.FETCH_SUCCESS, payload }),
  // fetchFailure: (payload) => ({ type: types.FETCH_FAILURE, payload }),
};

export const INITIAL_STATE = {
  isLoading: false,
};

const reducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING]: (state, action) => {
    state.isLoading = action.payload;
  },
});

export default reducer;
