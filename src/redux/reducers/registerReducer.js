import {createSlice} from '@reduxjs/toolkit';
import {getRegisteredUser} from '../actions/firebaseAction';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registeredUserSlice = createSlice({
  name: 'registeredUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRegisteredUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRegisteredUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getRegisteredUser.rejected, (state, action) => {
      state.error = 'Server error';
      state.isLoading = false;
    });
  },
});

export default registeredUserSlice.reducer;
