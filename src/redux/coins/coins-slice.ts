import { createSlice } from "@reduxjs/toolkit";
import { getFavoritePairs } from "./coins-operations";

const initialState = {
  favs: [] as string[],
  isLoading: false,
};

const coinsSlice = createSlice({
  name: "favCoins",
  initialState,
  reducers: {
    setFavoriteCoins(state, action) {
      state.favs = action.payload;
    },
    addToFavorite(state, action) {
      const pair = action.payload;
      if (state.favs.includes(pair)) {
        state.favs = state.favs.filter((el) => el !== pair);
      } else {
        state.favs.push(pair);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoritePairs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoritePairs.fulfilled, (state, action) => {
        state.favs = action.payload.favCoins;
        state.isLoading = false;
      })
      .addCase(getFavoritePairs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFavoriteCoins, addToFavorite } = coinsSlice.actions;
export default coinsSlice.reducer;
