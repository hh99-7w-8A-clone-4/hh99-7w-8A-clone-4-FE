import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../redux/module/userSlice"
import thunk from "redux-thunk";
import logger from "redux-logger";


const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
    user,
});

// 스토어 연결
const store = configureStore({
    reducer: rootReducer,

    middlewart: [...middlewares, logger],
});

export default store;