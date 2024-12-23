import {createAsyncThunk} from '@reduxjs/toolkit';
import {createUserWithEmailAndPassword} from 'firebase/auth';

export const getRegisteredUser = createAsyncThunk(
  'getRegisteredUser',
  async ({userName, email, password}) => {
    try {
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCredential.user;
      console.log('Registration Successful. Please Login to proceed');
      console.log(user);

      if (user) {
        try {
          // Update user profile
          await auth().currentUser.updateProfile({
            displayName: userName,
          });

          // Navigate to HomeScreen
          return user;
        } catch (error) {
          alert(error.message);
          console.error('Profile update failed:', error);
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);

      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        //   setErrortext("That email address is already in use!");
      } else {
        //   setErrortext(error.message);
      }
    }
  },
);
