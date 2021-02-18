import {
  all,
  put,
  call,
  fork,
  select,
  // takeEvery,
  // select,
  takeLatest,
} from "redux-saga/effects";
import { fetchData } from "store/sagas/baseSaga";

function* searchRequest(action) {
  const payload = action.payload;
  const { value, currentCategory } = payload;

  if (currentCategory === "storage") {
    let persistItems = yield select((state) => state.storage.data.persistItems);
    yield put({
      type: "search/ON_SEARCH_SUCCESS",
      payload: { total_count: persistItems.length, items: persistItems },
    });
  }

  if (currentCategory === "users") {
    const successAction = (res) => {
      return function* () {
        yield put({
          type: "search/ON_SEARCH_SUCCESS",
          payload: res.data,
        });
        yield put({
          type: "storage/ON_STORAGE_SUCCESS",
          payload: Object.assign({}, { value }, res.data),
        });
      };
    };
    const failureAction = (res) => {
      return function* () {
        yield put({
          type: "search/ON_SEARCH_FAILURE",
          payload: res.data,
        });
      };
    };
    yield fork(fetchData, payload, successAction, failureAction);
  }
}

export default function* watcherSearchSaga() {
  yield all([takeLatest("search/ON_SEARCH", searchRequest)]);
}
