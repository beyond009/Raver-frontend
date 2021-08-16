import { configureStore } from "@reduxjs/toolkit";
import authActorReducer from "./features/authActor";
import userReducer from "./features/user";
const store = configureStore({
  reducer: {
    authActor: authActorReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
