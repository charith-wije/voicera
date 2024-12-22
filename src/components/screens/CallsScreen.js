import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const CallsScreen = ({openCallModal}) => {
  useEffect(() => {
    openCallModal(true);
  }, []);

  return (
    <View>
      <Text>CallsScreen</Text>
    </View>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({});
