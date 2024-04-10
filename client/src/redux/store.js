import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/useSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
