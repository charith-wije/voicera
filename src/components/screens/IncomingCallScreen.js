import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const IncomingCallScreen = () => {
  return (
    <View style={styles.cameraPreview}>
      <Text style={styles.name}>Alex</Text>
      <Text style={styles.phoneNumber}>ringing +31 234 598 342</Text>
    </View>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
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
