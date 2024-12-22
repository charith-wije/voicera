import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInputVoicera from '../../molecules/FormInputVoicera';
import SubmitButtonVoicera from '../../molecules/SubmitButtonVoicera';

const userInfo = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  mobileNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(3, 'Invalid name')
      .required('First name is required!'),
    lastName: Yup.string()
      .trim()
      .min(3, 'Invalid name')
      .required('Last name is required!'),
    dateOfBirth: Yup.string().required('Date of birth is required'),
    mobileNumber: Yup.string().min(10).required('Mobile number is required'),
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

  const handleRegister = async values => {};

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
      }}
      enableOnAndroid={true}
      extraScrollHeight={0}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <SafeAreaView style={{flex: 2, backgroundColor: 'blue'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: '#f5cd05',
                padding: 8,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10,
                marginLeft: 10,
              }}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/call_image.png')}
              style={{width: '90%', height: 150, resizeMode: 'contain'}}
            />
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView
          style={{
            flex: 5,
            paddingTop: 32,
            paddingHorizontal: 25,
            backgroundColor: 'white',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <ScrollView>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                setTimeout(() => {
                  console.log(values);
                  formikActions.resetForm();
                  formikActions.setSubmitting(false);
                  handleRegister(values);
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
                const {
                  firstName,
                  lastName,
                  dateOfBirth,
                  mobileNumber,
                  email,
                  password,
                  confirmPassword,
                } = values;
                return (
                  <>
                    <FormInputVoicera
                      value={firstName}
                      placeholder="User Name"
                      placeholderTextColor="grey"
                      label="First Name"
                      onBlur={handleBlur('firstName')}
                      error={touched.firstName && errors.firstName}
                      onChangeText={handleChange('firstName')}
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
                    <TouchableOpacity
                      style={{alignItems: 'flex-end', marginBottom: 20}}>
                      <Text style={{color: '#424242', textAlign: 'right'}}>
                        Forgot Password?
                      </Text>
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

            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              Or
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
                marginVertical: 10,
                color: 'grey',
              }}>
              Sign Up with
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e0e0de',
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}>
                <Image
                  source={require('../../../assets/images/google_image.png')}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <Text
                style={{color: '#424242', fontWeight: '700', marginRight: 5}}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={{color: '#f5cd05', fontWeight: '700'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  label: {color: '#424242', marginLeft: 12},
  textInput: {
    backgroundColor: '#e0e0de',
    padding: 16,
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
  },
});
