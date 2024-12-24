import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, logoutUser, loginUser } from "./user-operations";

const initialState = {
  user: {firstName: null, lastName: null, email: null, id: null},
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    revokeError(state) {
      state.isError =false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      const payload = action.payload as {detail: string}
      state.message = payload.detail
      state.isError = true
      state.isLoading = false
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      const payload = action.payload as {detail: string}
      state.message = payload.detail
      state.isError = true
      state.isLoading = false
      state.user = initialState.user
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isError = false
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      const payload = action.payload as {detail: string}
      state.message = payload.detail
      state.isError = true
      state.isLoading = false
    });
  },
});

export const {revokeError} = userSlice.actions
export default userSlice.reducer;
