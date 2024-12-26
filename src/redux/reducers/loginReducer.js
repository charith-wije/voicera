// import {createSlice} from '@reduxjs/toolkit';
// import {loginUser} from '../actions/firebaseAction';

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// export const loginUserSlice = createSlice({
//   name: 'loginUser',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(loginUser.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.user = action.payload;
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.error = 'Server error';
//       state.isLoading = false;
//     });
//   },
// });

// export default loginUserSlice.reducer;
