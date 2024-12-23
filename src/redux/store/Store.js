import {configureStore} from '@reduxjs/toolkit';
import callModalReducer from '../reducers/CallModalReducer';
import registeredUserReducer from '../reducers/registerReducer';

export const store = configureStore({
  reducer: {
    callModal: callModalReducer,
    registeredUser: registeredUserReducer,
  },
});
