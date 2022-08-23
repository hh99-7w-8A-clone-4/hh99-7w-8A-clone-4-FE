import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatSlice from "./modules/chatSlice";
import friendSlice from "./modules/friendSlice";

const reducer = combineReducers({
  chatSlice,
  friendSlice,
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
});
