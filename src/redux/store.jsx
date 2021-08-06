import { configureStore } from "@reduxjs/toolkit";
import authActorReducer from "./features/authActor";
import identityReducer from "./features/identity";
import userReducer from "./features/user";
const store = configureStore({
  reducer: {
    authActor: authActorReducer,
    identity: identityReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
