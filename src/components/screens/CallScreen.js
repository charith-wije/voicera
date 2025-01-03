import {StyleSheet} from 'react-native';
import React from 'react';
import CallActionBox from '../organism/CallActionBox';
import ViewVoicera from '../atoms/ViewVoicera';

const CallScreen = () => {
  return (
    <ViewVoicera style={styles.page}>
      <ViewVoicera style={styles.cameraPreview}></ViewVoicera>
      <CallActionBox />
    </ViewVoicera>
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
