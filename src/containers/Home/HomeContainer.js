import React, { useCallback } from "react";
import HomeComponent from "components/Home/HomeComponent";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { actions as searchActions } from "store/modules/search/searchModule";
export const HomeContext = React.createContext({});
export default function HomeContainer() {
  const dispatch = useDispatch();
  const {
    currentCategory,
    loading,
    value,
    persistItems,
    searchedItems,
    items,
  } = useSelector((state) => ({
    currentCategory: state.search.data.currentCategory,
    loading: state.search.data.loading,
    value: state.search.data.value,
    persistItems: state.storage.data.persistItems,
    searchedItems: state.search.data.searchedItems,
  }));

  const handler = useCallback(
    debounce(({ value }) => {
      if (value.length >= 3) {
        dispatch(
          searchActions.onSearch({
            method: "get",
            api: "searchUsers",
            params: {
              q: encodeURIComponent(value),
              per_page: 30,
              page: 1,
            },
            loadingBar: true,
            value,
            currentCategory,
          })
        );
      } else {
        dispatch(
          searchActions.onSearchReset({
            value: "",
          })
        );
      }
    }, 1000),
    [currentCategory]
  );

  const onChange = (e) => {
    let value = e.target.value;
    handler({ value });
  };

  const onScrollSearch = ({ value, page }) =>
    dispatch(
      searchActions.onSearch({
        method: "get",
        api: "searchUsers",
        params: {
          q: encodeURIComponent(value),
          per_page: 30,
          page,
        },
        loadingBar: true,
        value,
        currentCategory,
      })
    );

  const onSelect = (e) => {
    let value = e.target.value;
    dispatch(searchActions.onSelect({ value }));
  };

  return (
    <HomeContext.Provider
      value={{
        value,
        currentCategory,
        loading,
        value,
        persistItems,
        searchedItems,
        onChange,
        onScrollSearch,
        onSelect,
      }}
    >
      <HomeComponent />
    </HomeContext.Provider>
  );
}
