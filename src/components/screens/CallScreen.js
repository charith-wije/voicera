import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallActionBox from '../organism/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}></View>
      <CallActionBox />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#ffff6e',
    position: 'absolute',
    top: 60,
    right: 10,
  },
});
