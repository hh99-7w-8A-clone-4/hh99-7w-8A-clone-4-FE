import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomPic: "",
  roomTitle: "",
  isLoading: false,
  err: null,
};

const currentRoomSlice = createSlice({
  name: "currentRoomSlice",
  initialState,
  reducers: {
    connectRoom: (state, action) => {
      state.roomPic = action.payload.roomPic;
      state.roomTitle = action.payload.roomName;
    },
  },
});

export const { connectRoom } = currentRoomSlice.actions;

export default currentRoomSlice.reducer;
