import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { cartSlice } from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
