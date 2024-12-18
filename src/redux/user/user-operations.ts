import { userApi } from "../../api/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignupType, UserLoginType } from "../../constants";

export const signUpUser = createAsyncThunk(
  "auth/SignUp",
  async (data: UserSignupType, { rejectWithValue }) => {
    try {
      const user = userApi.signUpUser(data);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
    "/auth/login",
    async (user: UserLoginType, { rejectWithValue }) => {
      try {
        const response = userApi.loginUser(user);
        return response;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );

export const logoutUser = createAsyncThunk(
  "/logout",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      const response = userApi.logOutUser(userId);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
