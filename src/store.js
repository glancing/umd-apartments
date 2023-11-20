import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './reducers/favoritesSlice';
import filterReducer from './reducers/filterSlice';
import apartmentsReducer from './reducers/apartmentsSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filterSlice: filterReducer,
    apartments: apartmentsReducer
  },
});

export default store;