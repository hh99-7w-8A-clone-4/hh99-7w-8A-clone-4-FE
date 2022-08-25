import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import webstomp from "webstomp-client";
import { Buffer } from "buffer";
import { axiosInstance } from "../../shared/apis";
import SockJS from "sockjs-client";
const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const LOGIN = "user/LOGIN";
// const LOGOUT = "user/LOGOUT"

export function UserLogIn(user) {
  console.log("UserLogIn");
  return { type: LOGIN, user };
}

// export function UserLogOut (user){
//     console.log("LOGOUT");
//     return {type: LOGOUT, user}
// }

const initialState = {
  userName: null,
};

//엑세스토큰 안에

export const __userLogin = createAsyncThunk(
  "/api/login",
  async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
      const response = await axios.post(`${URI.BASE}/api/login`, {
        email,
        password,
      });

      const accessToken = response.headers.authorization;
      const refreshtoken = response.headers[`refresh-token`];
      const encodeBody = accessToken.split(".")[1];
      const decodeBody = new Buffer.from(encodeBody, "base64").toString("utf8");
      const jsonBody = JSON.parse(decodeBody);
      axiosInstance.defaults.headers.common["Authorization"] = accessToken;
      localStorage.setItem("userId", jsonBody.jti);
      localStorage.setItem("userName", jsonBody.sub);
      localStorage.setItem("userProfileImg", response.data.profilePic);
      localStorage.setItem("userInfo", response.data.introduce);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshtoken);
      return thunkAPI.fulfillWithValue(jsonBody.sub);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    asyncUserName: (state, action) => {
      state.userName = localStorage.getItem("userName");
    },
    userLogout: (state, action) => {
      const userToken = localStorage.getItem("accessToken");
      axios.delete(`${URI.BASE}/api/logout`, {
        headers: {
          Authorization: userToken,
        },
      });
    },
  },
  extraReducers: {
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.userName = action.payload;
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { asyncUserName, userLogout } = userSlice.actions;
// export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
