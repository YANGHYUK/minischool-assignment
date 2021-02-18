import React, { useState, useEffect } from "react";
import "./SearchbarComponent.scss";
export default function SearchbarComponent(props) {
  const { onChange = () => {}, value = "", currentCategory = "" } = props;
  const [searchbarValue, setSearchbarValue] = useState("");

  const onChangeValue = (e) => {
    let value = e.target.value;
    setSearchbarValue(value);
    onChange(e);
  };

  useEffect(() => {
    setSearchbarValue("");
  }, [currentCategory]);

  return (
    <input
      className="searchbar-style"
      type="text"
      placeholder="3글자 이상 입력해주세요"
      onChange={onChangeValue}
      value={searchbarValue}
    />
  );
}
