import React, {useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInputVoicera from '../../molecules/FormInputVoicera';
import SubmitButtonVoicera from '../../molecules/SubmitButtonVoicera';
import ViewVoicera from '../../atoms/ViewVoicera';
import TextVoicera from '../../atoms/TextVoicera';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

const userInfo = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .trim()
      .min(3, 'Invalid name')
      .required('User name is required!'),
    email: Yup.string()
      .trim()
      .email('Invalid email!')
      .required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(8, 'Password is too short!')
      .required('password is required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password does not match!')
      .required('Confirm password is required!'),
  });

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setFcmToken(fcmToken);
    }
  };

  const updateUserName = async (name, email) => {
    const user = auth().currentUser; // Get the current user

    if (user) {
      try {
        // Update the user profile with the new display name
        await user.updateProfile({displayName: name});
        console.log(auth().currentUser);
        console.log('Profile updated successfully');
        await firestore()
          .collection('users')
          .add({
            name,
            email,
            fcmToken,
          })
          .then(() => {
            console.log('User added!');
            navigation.navigate('Signin');
          });
      } catch (err) {
        console.error('Profile update failed:', err.message);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  const handleRegister = async values => {
    console.log('hi');
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        const user = userCredential.user;
        updateUserName(values.userName, values.email);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardAwareScrollViewContainer}
      enableOnAndroid={true}
      extraScrollHeight={0}
      keyboardShouldPersistTaps="handled">
      <ViewVoicera style={styles.mainContainer}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <ViewVoicera style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonSubContainer}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          </ViewVoicera>
          <ViewVoicera style={styles.imageView}>
            <Image
              source={require('../../../assets/images/call_image.png')}
              style={styles.image}
            />
          </ViewVoicera>
        </SafeAreaView>
        <KeyboardAvoidingView style={styles.formMainContainer}>
          <ScrollView>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                setTimeout(() => {
                  // console.log(values);
                  formikActions.resetForm();
                  formikActions.setSubmitting(false);
                  handleRegister(values);
                }, 500);
              }}>
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                const {userName, email, password, confirmPassword} = values;
                return (
                  <>
                    <FormInputVoicera
                      value={userName}
                      placeholder="User Name"
                      placeholderTextColor="grey"
                      label="User Name"
                      onBlur={handleBlur('userName')}
                      error={touched.userName && errors.userName}
                      onChangeText={handleChange('userName')}
                      color={'black'}
                    />

                    <FormInputVoicera
                      value={email}
                      placeholder="Enter Email"
                      placeholderTextColor="grey"
                      label="Enter Email"
                      keyboardType="email-address"
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                      onChangeText={handleChange('email')}
                      color={'black'}
                    />

                    <FormInputVoicera
                      value={password}
                      placeholder="Password"
                      placeholderTextColor="grey"
                      label="Password"
                      secureTextEntry
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      onChangeText={handleChange('password')}
                      color={'black'}
                    />

                    <FormInputVoicera
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      placeholderTextColor="grey"
                      label="Confirm Password"
                      secureTextEntry
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && errors.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      color={'black'}
                    />
                    <TouchableOpacity style={styles.forgotPasswordView}>
                      <TextVoicera style={styles.forgotPasswordText}>
                        Forgot Password?
                      </TextVoicera>
                    </TouchableOpacity>

                    <SubmitButtonVoicera
                      label="Sign Up"
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                    />
                  </>
                );
              }}
            </Formik>

            <TextVoicera style={styles.orText}>Or</TextVoicera>

            <TextVoicera style={styles.signUpWithText}>
              Sign Up with
            </TextVoicera>
            <ViewVoicera style={styles.googleLogoMainView}>
              <TouchableOpacity
                onPress={checkToken}
                style={styles.googleViewTouchableView}>
                <Image
                  source={require('../../../assets/images/google_image.png')}
                  style={styles.googleImage}
                />
              </TouchableOpacity>
            </ViewVoicera>
            <ViewVoicera style={styles.dontHaveAccountView}>
              <TextVoicera style={styles.dontHaveAccountText}>
                Don't have an account?
              </TextVoicera>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <TextVoicera style={styles.loginText}>Login</TextVoicera>
              </TouchableOpacity>
            </ViewVoicera>
          </ScrollView>
        </KeyboardAvoidingView>
      </ViewVoicera>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  mainContainer: {flex: 1, backgroundColor: 'blue'},
  safeAreaViewContainer: {flex: 2, backgroundColor: 'blue'},
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  backButtonSubContainer: {
    backgroundColor: '#f5cd05',
    padding: 8,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 10,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: '90%', height: 150, resizeMode: 'contain'},
  formMainContainer: {
    flex: 5,
    paddingTop: 32,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#424242',
    textAlign: 'right',
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'black',
  },
  signUpWithText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: 'grey',
  },
  googleLogoMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googleViewTouchableView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0de',
    width: 50,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  googleImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  dontHaveAccountView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  dontHaveAccountText: {
    color: '#424242',
    fontWeight: '700',
    marginRight: 5,
  },
  loginText: {
    color: '#f5cd05',
    fontWeight: '700',
  },
});
