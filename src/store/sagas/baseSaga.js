import {
  call,
  put,
  cancelled,
  // delay
} from "redux-saga/effects";
import { apiFetch } from "lib/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function* fetchData(
  payload,
  successAction = null,
  failureAction = null
) {
  const { loadingBar } = payload;

  // saga logic start
  if (loadingBar) {
    yield put(showLoading());
  }
  try {
    yield put({ type: "base/FETCH_SUCCESS", payload: true });
    const res = yield call(apiFetch, payload);

    if (res && successAction) {
      yield call(successAction(res));
    } else if (!res && failureAction) {
      yield call(failureAction(res));
    }
  } catch (e) {
    console.log({ e });
    yield put({ type: "base/FETCH_FAILURE", payload: e, error: true });
    yield put({
      type: "modal/SHOW_MODAL",
      payload: {
        dark: true,
        modalName: "alert",
        modalContent: e?.response?.data
          ? JSON.stringify(e?.response?.data)
          : "",
        modalStyle: "blueGradientStyle",
        modalTitle: "Wait!",
      },
    });
    yield call(failureAction(e));
  } finally {
    //loading & loadingBar end
    if (yield cancelled()) {
      // yield put({ type: "base/IS_LOADING", payload: false });
    }
    yield put(hideLoading());
  }
  // yield put({ type: "base/IS_LOADING", payload: false });
  yield put(hideLoading());
  // saga logic end
}
