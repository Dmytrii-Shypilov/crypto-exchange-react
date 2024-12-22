import { createAsyncThunk } from "@reduxjs/toolkit";
import { coinsAPI } from "../../api/coinsAPI";
import axios from "axios";


export const getFavoritePairs = createAsyncThunk("/auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coinsAPI.fetchFavoriteCoins();
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  })