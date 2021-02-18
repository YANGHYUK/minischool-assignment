import createReducer from "store/createReducer";

export const types = {
  ON_SEARCH: "search/ON_SEARCH",
  ON_SEARCH_SUCCESS: "search/ON_SEARCH_SUCCESS",
  ON_SEARCH_FAILURE: "search/ON_SEARCH_FAILURE",
  ON_SEARCH_RESET: "search/ON_SEARCH_RESET",
  ON_SELECT: "search/ON_SELECT",
};

export const actions = {
  onSearch: (payload) => ({ type: types.ON_SEARCH, payload }),
  onSearchReset: (payload) => ({ type: types.ON_SEARCH_RESET, payload }),
  onSelect: (payload) => ({ type: types.ON_SELECT, payload }),
};

export const INITIAL_STATE = {
  data: {
    loading: null,
    currentCategory: "users", //users or storage
    total_count: 0,
    searchedItems: [],
    value: "",
  },
};

const reducer = createReducer(INITIAL_STATE, {
  [types.ON_SEARCH]: (state, action) => {
    const { value } = action.payload;
    state.data.value = value;
    state.data.loading = true;
  },
  [types.ON_SEARCH_RESET]: (state, action) => {
    state.data.value = "";
    state.data.searchedItems = [];
  },

  [types.ON_SELECT]: (state, action) => {
    const { value } = action.payload;
    state.data.currentCategory = value;
    state.data.value = "";
    state.data.searchedItems = [];
  },

  [types.ON_SEARCH_SUCCESS]: (state, action) => {
    const {
      total_count = 0,
      items = 0,
      incomplete_results = false,
    } = action.payload;
    state.data.total_count = total_count;
    state.data.searchedItems = state.data.searchedItems.concat(items);
    state.data.loading = false;
  },
});

export default reducer;
