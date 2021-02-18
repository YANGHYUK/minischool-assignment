import React, { useContext, useState } from "react";
import "./HomeComponent.scss";
import SearchbarComponent from "components/commons/UI/Searchbar";
import SelectbarComponent from "components/commons/UI/Selectbar";
import ListComponent from "components/commons/UI/List";
import { HomeContext } from "containers/Home/HomeContainer";
export default function HomeComponent() {
  const {
    value,
    loading,
    currentCategory,
    persistItems,
    searchedItems,
    onChange,
    onScrollSearch,
    onSelect,
  } = useContext(HomeContext);

  return (
    <div className="home-style">
      <div className="home-style__searchBox">
        <SearchbarComponent
          value={value}
          currentCategory={currentCategory}
          onChange={onChange}
        />
        <SelectbarComponent
          currentCategory={currentCategory}
          onSelect={onSelect}
        />
      </div>

      <div className="home-style__listBox">
        {currentCategory === "users" && (
          <ListComponent
            loading={loading}
            value={value}
            items={searchedItems}
            onScrollSearch={onScrollSearch}
          />
        )}
        {currentCategory === "storage" && (
          <ListComponent
            loading={loading}
            value={value}
            onScrollSearch={onScrollSearch}
            items={
              persistItems[value]
              // persistItems.filter(
              //   (ele) => ele?.keyword === value && ele?.items
              // )[0]?.items
            }
          />
        )}
      </div>
    </div>
  );
}
