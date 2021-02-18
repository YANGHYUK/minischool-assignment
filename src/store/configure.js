import {
  createStore,
  applyMiddleware,
  combineReducers,
  /* compose, */
} from "redux";
import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from "redux-devtools-extension";
import * as modules from "store/modules";
import rootSaga from "store/sagas";
// import logger from "redux-logger" // for checking log

//redux-persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//loading bar
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from "react-redux-loading-bar";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["base", "modal", "search"],
};

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ ...modules, loadingBar: loadingBarReducer });
const middlewares = [sagaMiddleware];

// 개발 모드일 때만 Redux Devtools 적용
// const isDev = process.env.NODE_ENV === 'development';
// const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// const composeEnhancers = devtools || compose;

// preloadedState는 추후 서버사이드 렌더링이 되었을 때 전달 받는 초기 상태

/* const configure = preloadedState => {
    const store = createStore(
        reducers,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
    sagaMiddleware.run(rootSaga);
    return store;
}; */

const enhancedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  enhancedReducer,
  // composeWithDevTools(
  applyMiddleware(
    ...middlewares,
    loadingBarMiddleware()
    // ,logger
  )
  // )
);
sagaMiddleware.run(rootSaga);

export default store;
