import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const apartmentId = action.payload;
      if (state.includes(apartmentId)) {
        return state.filter(id => id !== apartmentId);
      } else {
        return [...state, apartmentId];
      }
    },
    clearFavorites: (state) => {
      return [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
