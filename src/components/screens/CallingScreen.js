import {StyleSheet} from 'react-native';
import React from 'react';
import CallActionBox from '../organism/CallActionBox';
import ViewVoicera from '../atoms/ViewVoicera';
import TextVoicera from '../atoms/TextVoicera';

const CallingScreen = () => {
  return (
    <ViewVoicera style={styles.page}>
      <ViewVoicera style={styles.cameraPreview}>
        <TextVoicera style={styles.name}>Alex</TextVoicera>
        <TextVoicera style={styles.phoneNumber}>
          ringing +31 234 598 342
        </TextVoicera>
      </ViewVoicera>

      <CallActionBox />
    </ViewVoicera>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
});

export default CallingScreen;
