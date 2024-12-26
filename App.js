import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeNavigator from './src/navigations/HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AgoraProvider} from './src/helpers/AgoraContext';
import AuthNavigator from './src/navigations/AuthNavigato';
import {useSelector} from 'react-redux';
const App = () => {
  const {isLogged} = useSelector(state => state.isLogged);
  return (
    <AgoraProvider>
      <NavigationContainer>
        {isLogged ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AgoraProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
