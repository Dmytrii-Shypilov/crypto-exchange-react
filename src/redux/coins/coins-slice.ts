import { createSlice } from "@reduxjs/toolkit";


const initialState = [] as string[];

const coinsSlice = createSlice({
  name: "favCoins",
  initialState,
  reducers: {
    setFavoriteCoins(_, action) {
      return action.payload;
    },
    addToFavorite(state, action) {
    const pair = action.payload
    if (state.includes(pair)) {
        return state.filter(el=> el !== pair)
    } else {
        state.push(pair)
    }
    
    }
  },
});

export const { setFavoriteCoins, addToFavorite } = coinsSlice.actions;
export default coinsSlice.reducer