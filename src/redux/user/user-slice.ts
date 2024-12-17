import { createSlice } from "@reduxjs/toolkit";
import { signUpUser } from "./user-operations";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
        state.isLoading =true;
    })
    builder.addCase(signUpUser.fulfilled, (state, action)=> {
      state.user = action.payload; 
      state.isAuthenticated = true;
      state.isLoading = false;
    })

}});


export const {logoutUser} = userSlice.actions
export default userSlice.reducer