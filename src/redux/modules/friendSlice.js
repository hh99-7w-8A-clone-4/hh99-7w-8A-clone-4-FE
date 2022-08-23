import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const initialState = {
  friends: [],
  friendProfile: {},
  isLoading: false,
  err: null,
};

export const __getFriendList = createAsyncThunk(
  "friend/__getFriendList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("accessToken");
      const requestRes = await axios.get(`${URI.BASE}/api/friends`, {
        headers: {
          Authorization: userToken,
        },
      });

      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __findFriendProfile = createAsyncThunk(
  "friend/__findFriendProfile",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("accessToken");
      const requestRes = await axios.get(
        `${URI.BASE}/api/member?email=${payload}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __addFriend = createAsyncThunk(
  "friend/__addFriend",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("accessToken");
      const requestRes = await axios.post(
        `${URI.BASE}/api/friends`,
        {
          email: payload,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {
    resetFindProfile: (state, action) => {
      state.friendProfile = {};
    },
  },
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
    [__findFriendProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__findFriendProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friendProfile = action.payload;
    },
    [__findFriendProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [__addFriend.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addFriend.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends.push(action.payload);
    },
    [__addFriend.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { resetFindProfile } = friendSlice.actions;

export default friendSlice.reducer;
