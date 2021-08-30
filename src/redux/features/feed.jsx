import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const feed = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateFeed } = feed.actions;

export default feed.reducer;
