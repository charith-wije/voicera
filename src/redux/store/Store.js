import {configureStore} from '@reduxjs/toolkit';
import callModalReducer from '../reducers/CallModalReducer';

export const store = configureStore({
  reducer: {
    callModal: callModalReducer,
  },
});
