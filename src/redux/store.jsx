import { configureStore } from "@reduxjs/toolkit";
import authActorReducer from "./features/authActor";
import userReducer from "./features/user";
import feedReducer from "./features/feed";
const store = configureStore({
  reducer: {
    authActor: authActorReducer,
    user: userReducer,
    feed: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
