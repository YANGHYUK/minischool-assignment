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

  let items = []; // Object 형태로 각기 저장되어 있는 storage 데이터를 하나의 배열로 합침
  for (const key in persistItems) {
    if (key.includes(value)) {
      items = [...items, ...persistItems[key]];
    }
  }

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
              items.filter((item1, index) => 
              index === items.findIndex((item2) =>  // 중복되는 계정을 제거
              item1.id === item2.id))
            }
          />
        )}
      </div>
    </div>
  );
}
