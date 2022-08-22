import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const initialState = {
  friends: [],
  isLoading: false,
  err: null,
};

export const __getFriendList = createAsyncThunk(
  "friend/__getFriendList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const requestRes = await axios.get(`${URI.BASE}/api/friends`, {
        headers: {
          Authorization: userToken,
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
      state.friends.concat(action.payload);
    },
    [__getFriendList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export default friendSlice.reducer;
