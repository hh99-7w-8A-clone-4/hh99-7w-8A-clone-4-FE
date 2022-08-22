import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatSlice from "./modules/chatSlice";

const reducer = combineReducers({
  chatSlice,
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
});
