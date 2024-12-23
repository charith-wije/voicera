import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitButtonVoicera from '../../molecules/SubmitButtonVoicera';
import FormInputVoicera from '../../molecules/FormInputVoicera';
import ViewVoicera from '../../atoms/ViewVoicera';
import TextVoicera from '../../atoms/TextVoicera';

const loginDetails = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email('Invalid email!')
      .required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(8, 'Password is too short!')
      .required('password is required!'),
  });

  const handleLogin = async values => {};

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardAwareScrollViewContainer}
      enableOnAndroid={true}
      extraScrollHeight={20}
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
          <Formik
            initialValues={loginDetails}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              setTimeout(() => {
                formikActions.resetForm();
                formikActions.setSubmitting(false);
                handleLogin(values);
                // dispatch(login());
              }, 3000);
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
              const {email, password} = values;
              return (
                <>
                  <ViewVoicera style={styles.formSubContainer}>
                    <FormInputVoicera
                      value={email}
                      placeholder="Enter Email"
                      placeholderTextColor="grey"
                      label="Email"
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
                    <TouchableOpacity style={styles.forgotPasswordView}>
                      <TextVoicera style={styles.forgotPasswordText}>
                        Forgot Password?
                      </TextVoicera>
                    </TouchableOpacity>
                  </ViewVoicera>
                  <ViewVoicera style={styles.formSecondSubContainer}>
                    <SubmitButtonVoicera
                      label="Login"
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                    />
                    <TextVoicera style={styles.orText}>Or</TextVoicera>

                    <TextVoicera style={styles.loginWithText}>
                      Login with
                    </TextVoicera>
                    <ViewVoicera style={styles.googleLogoMainView}>
                      <TouchableOpacity style={styles.googleViewTouchableView}>
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}>
                        <TextVoicera style={styles.signUpText}>
                          Sign Up
                        </TextVoicera>
                      </TouchableOpacity>
                    </ViewVoicera>
                  </ViewVoicera>
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ViewVoicera>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

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
  image: {
    width: '90%',
    height: 220,
    resizeMode: 'contain',
  },
  formMainContainer: {
    flex: 3,
    paddingTop: 32,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  formSubContainer: {
    flex: 1,
    marginBottom: 25,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#424242',
    textAlign: 'right',
  },
  formSecondSubContainer: {
    flex: 1,
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'black',
  },
  loginWithText: {
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
  signUpText: {
    color: '#f5cd05',
    fontWeight: '700',
  },
});
