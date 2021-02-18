import { all } from "redux-saga/effects";

import watcherSearchSaga from "./search/watcherSearchSaga";

export default function* rootSaga() {
  yield all([
    watcherSearchSaga(),
    // watcherLoginSaga(), //로그인
  ]);
}
