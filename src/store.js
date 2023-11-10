import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './reducers/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;