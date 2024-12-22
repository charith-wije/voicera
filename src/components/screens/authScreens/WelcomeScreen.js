import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <View
        style={{flex: 1, justifyContent: 'space-around', marginVertical: 26}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
          }}>
          Let's Get Started!
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/call_image.png')}
            style={{width: '100%', height: 350, resizeMode: 'contain'}}
          />
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              paddingVertical: 16,
              backgroundColor: '#f5cd05',
              marginHorizontal: 24,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#4a4a49',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontWeight: '700', marginRight: 5}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={{color: '#f5cd05', fontWeight: '700'}}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
