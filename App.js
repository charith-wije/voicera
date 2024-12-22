import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeNavigator from './src/navigations/HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AgoraProvider} from './src/helpers/AgoraContext';
import AuthNavigator from './src/navigations/AuthNavigato';

const App = () => {
  return (
    <AgoraProvider>
      <NavigationContainer>
        {/* <HomeNavigator /> */}
        <AuthNavigator />
      </NavigationContainer>
    </AgoraProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
