import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ViewVoicera from '../../atoms/ViewVoicera';
import TextVoicera from '../../atoms/TextVoicera';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ViewVoicera style={styles.mainSubContainer}>
        <TextVoicera style={styles.letsGetStartedText}>
          Let's Get Started!
        </TextVoicera>
        <ViewVoicera style={styles.welcomeImageView}>
          <Image
            source={require('../../../assets/images/call_image.png')}
            style={styles.welcomeImage}
          />
        </ViewVoicera>
        <ViewVoicera style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Signup')}>
            <TextVoicera style={styles.signUpText}>Sign Up</TextVoicera>
          </TouchableOpacity>
          <ViewVoicera style={styles.alreadyHaveAccountView}>
            <TextVoicera style={styles.alreadyHaveAccountText}>
              Already have an account?
            </TextVoicera>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <TextVoicera style={styles.loginText}>Log In</TextVoicera>
            </TouchableOpacity>
          </ViewVoicera>
        </ViewVoicera>
      </ViewVoicera>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  mainSubContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 26,
  },
  letsGetStartedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  welcomeImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  signUpButton: {
    paddingVertical: 16,
    backgroundColor: '#f5cd05',
    marginHorizontal: 24,
    borderRadius: 10,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4a4a49',
  },
  alreadyHaveAccountView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  alreadyHaveAccountText: {
    color: 'white',
    fontWeight: '700',
    marginRight: 5,
  },
  loginText: {
    color: '#f5cd05',
    fontWeight: '700',
  },
});
