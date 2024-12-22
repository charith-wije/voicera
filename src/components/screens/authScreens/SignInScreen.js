import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
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
import SubmitButtonVoicera from '../../molecules/SubmitButtonVoicera';
import FormInputVoicera from '../../molecules/FormInputVoicera';

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
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
      }}
      enableOnAndroid={true}
      extraScrollHeight={20}
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
              style={{width: '90%', height: 220, resizeMode: 'contain'}}
            />
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView
          style={{
            flex: 3,
            paddingTop: 32,
            paddingHorizontal: 25,
            backgroundColor: 'white',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
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
                  <View style={{flex: 1, marginBottom: 25}}>
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
                    <TouchableOpacity style={{alignItems: 'flex-end'}}>
                      <Text style={{color: '#424242', textAlign: 'right'}}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    <SubmitButtonVoicera
                      label="Login"
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                    />
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
                      Login with
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
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: '#424242',
                          fontWeight: '700',
                          marginRight: 5,
                        }}>
                        Don't have an account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={{color: '#f5cd05', fontWeight: '700'}}>
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
