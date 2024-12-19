import { userApi } from "../../api/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignupType, UserLoginType } from "../../constants";
import axios from "axios";

export const signUpUser = createAsyncThunk(
  "auth/SignUp",
  async (data: UserSignupType, { rejectWithValue }) => {
    try {
      const response = await userApi.signUpUser(data)   
      return response;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (user: UserLoginType, { rejectWithValue }) => {
    try {
      const response = await userApi.loginUser(user);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/logout",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      const response = await userApi.logOutUser(userId);
   
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);
