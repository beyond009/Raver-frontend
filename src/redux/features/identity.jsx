import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const identity = createSlice({
  name: "identity",
  initialState,
  reducers: {
    updateIdentity: (state, action) => {
      let targetProto = Object.getPrototypeOf(action.payload);
      return Object.assign(Object.create(targetProto), action.payload);
    },
  },
});

export const { updateIdentity } = identity.actions;

export default identity.reducer;
