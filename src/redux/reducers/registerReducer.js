// import {createSlice} from '@reduxjs/toolkit';
// import {registerUser} from '../actions/firebaseAction';

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// export const registeredUserSlice = createSlice({
//   name: 'registeredUser',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(registerUser.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.user = action.payload;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.error = 'Server error';
//       state.isLoading = false;
//     });
//   },
// });

// export default registeredUserSlice.reducer;
