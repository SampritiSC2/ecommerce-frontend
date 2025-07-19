import { createSlice } from "@reduxjs/toolkit";
import { getProfileThunk, loginThunk } from "../thunk/auth";
import type { User } from "../../types/auth/auth.model";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload?.user;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload!;
    });
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getProfileThunk.rejected, (state) => {
      state.user = null;
    })
  },
});

const authActions = authSlice.actions;
export { authSlice, authActions};
