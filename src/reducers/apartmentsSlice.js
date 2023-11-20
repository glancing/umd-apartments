import { createSlice } from '@reduxjs/toolkit';

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState: {},
  reducers: {
    setApartmentsByFilter: (state, action) => {
      const { price, roomType, rating, apartments } = action.payload;
      let key = `${price}-${roomType}-${rating}`;
      return { ...state, [key]: apartments };
    },
  },
});

export const { setApartmentsByFilter } = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
