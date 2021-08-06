import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      let targetProto = Object.getPrototypeOf(action.payload);
      return Object.assign(Object.create(targetProto), action.payload);
    },
  },
});

export const { updateUser } = user.actions;

export default user.reducer;
