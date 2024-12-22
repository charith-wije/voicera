import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  callType: 'audio',
};

export const callModalSlice = createSlice({
  name: 'callModal',
  initialState,
  reducers: {
    updateCallType: (state, action) => {
      state.callType = action.payload;
    },
  },
});

export const {updateCallType} = callModalSlice.actions;
export default callModalSlice.reducer;
