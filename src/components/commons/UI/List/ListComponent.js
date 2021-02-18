import React, { useState, useEffect } from "react";
import "./ListComponent.scss";
export default function ListComponent(props) {
  const { value = "", items = [], loading, onScrollSearch } = props;

  const [scrollCount, setScrollCount] = useState(1);
  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setScrollCount(scrollCount + 1);
      onScrollSearch({ value, page: scrollCount + 1 });
    }
  };
  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  let displayLists = items;
  if (!value.length) {
    return <div className="error-msg">3글자 이상 입력해주세요.</div>;
  }

  if (!loading && !displayLists.length) {
    return <div className="error-msg">검색결과가 존재하지 않습니다.</div>;
  }

  return (
    <div className="list-style">
      {displayLists.map((list, index) => {
        let login = list?.login || "";
        let avatar_url = list?.avatar_url || "";

        return (
          <div className={`list-style__listContent`} key={index}>
            <span className="title">{login}</span>
            <img className="description" src={avatar_url} alt="avatar_url" />
          </div>
        );
      })}
    </div>
  );
}
