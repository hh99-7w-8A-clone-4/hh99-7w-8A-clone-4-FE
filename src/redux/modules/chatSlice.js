import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const initialState = {
  URI: `${URI.BASE}`,
  chatList: [],
  isLoading: false,
  err: null,
};

export const __getinitialChatList = createAsyncThunk(
  "/chat/__getinitialChatList",
  async (payload, thunkAPI) => {
    try {
      const requestRes = await axios.get(`${URI.BASE}/api/room/${payload}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    postChat: (state, action) => {
      state.chatList.push(action.payload);
    },
    clearChat: (state, action) => {
      state.chatList = new Array(0);
    },
  },
  extraReducers: {
    [__getinitialChatList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getinitialChatList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatList = action.payload;
    },
    [__getinitialChatList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { postChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
