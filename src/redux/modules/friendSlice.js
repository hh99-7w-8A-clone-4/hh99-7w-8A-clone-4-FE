import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const initialState = {
  friends: [
    {
      memberId: 1,
      nickname: "hanghae98",
      profilePic:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2019/10/22/98002028.1.jpg",
      introduce: "참을 수 없는 이끌림과 호기심",
    },
    {
      memberId: 2,
      nickname: "hanghae99",
      profilePic:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2019/10/22/98002028.1.jpg",
      introduce: "묘한 너와 나 두고 보면 알겠지",
    },
  ],
  isLoading: false,
  err: null,
};

export const __getFriendList = createAsyncThunk(
  "friend/__getFriendList",
  async (payload, thunkAPI) => {
    try {
      // const userToken = localStorage.getItem("userToken");
      const requestRes = await axios.get(`${URI.BASE}/api/friends`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoi64G867CCIiwiZXhwIjoxNjYxMTkyMTQ0fQ._3_dwFkF7Sfsklfe_9z65toWuLkLg45QscQ6uRguE1o",
        },
      });

      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getFriendList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getFriendList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    },
    [__getFriendList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export default friendSlice.reducer;
