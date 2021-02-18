import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
let BASENAME;
let CHAT_BASENAME;
let GRAPH_BASENAME;
BASENAME = "https://api.github.com";

// if (process.env.NODE_ENV !== "production") {
//   BASENAME = process.env.REACT_APP_API_KEY;
// } else {
// }

const path = {
  // new 모바일 새로 써나가는 버전
  searchUsers: "search/users", // 유저서치
};

function callApi(information) {
  const {
    method = "",
    api = "",
    params = "",
    body = {},
    token = "",
    contentType = "application/json",
    suffixes = "",
  } = information;

  // console.log({ information }, "API - this is what we send"); // this is shape of what we send for API
  let data; //we have two types for sending data, one is raw data (like, {}), the other is FormData
  if (contentType === "multipart/form-data") {
    let formData = new FormData();
    data = formData;
  } else {
    data = body;
  }
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  return axios({
    method,
    url: `${BASENAME}/${path[api]}`,
    data,
    params,
    headers: {
      "Content-Type": contentType,
      ...(token ? { AUTHORIZATION: `Bearer ${token}` } : {}),
    },
    timeout: 10000,
  });
}

export async function apiFetch(data) {
  // if multiple api request~!
  if (data instanceof Array && data.length) {
    const newArr = data.map((value) => {
      return callApi(value);
    });
    // many api works together
    return axios.all(newArr).then(axios.spread((...responses) => responses));
  }

  let enteredInfo = data;
  let res = await callApi(data);

  return res;
}
