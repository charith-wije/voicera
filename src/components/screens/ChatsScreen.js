import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const ChatsScreen = ({openCallModal}) => {
  useEffect(() => {
    openCallModal(true);
  }, []);
  return (
    <View>
      <Text>ChatsScreen</Text>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
