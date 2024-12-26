import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
};

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState,
  reducers: {
    updateIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const {updateIsLogged} = isLoggedSlice.actions;
export default isLoggedSlice.reducer;
