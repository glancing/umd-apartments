import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    price: "none",
    roomType: "none",
    rating: "none",
    showFavorites: false,
  },
  reducers: {
    setFilter: (state, action) => {
      const { price, roomType, rating, showFavorites } = action.payload;
      return { price, roomType, rating, showFavorites };
    },
    clearFilter: (state) => {
      return { price: "none", roomType: "none", rating: "none", showFavorites: false };
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
