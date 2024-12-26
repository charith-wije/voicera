import {configureStore} from '@reduxjs/toolkit';
import callModalReducer from '../reducers/CallModalReducer';
import isLoggedReducer from '../reducers/UserReducer';
// import registereUser from '../reducers/registerReducer';

export const store = configureStore({
  reducer: {
    callModal: callModalReducer,
    isLogged: isLoggedReducer,
    //   registeredUser: registereUser,
  },
});
