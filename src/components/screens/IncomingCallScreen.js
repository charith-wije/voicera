import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import ViewVoicera from '../atoms/ViewVoicera';
import TextVoicera from '../atoms/TextVoicera';

const IncomingCallScreen = () => {
  const onDecline = () => {
    console.warn('on Decline');
  };

  const onAccept = () => {
    console.warn('on Accept');
  };

  return (
    <ViewVoicera style={styles.root}>
      <TextVoicera style={styles.name}>Alex</TextVoicera>
      <TextVoicera style={styles.phoneNumber}>Voicera Video...</TextVoicera>

      <ViewVoicera style={[styles.row, {marginTop: 'auto'}]}>
        {/* Decline Button*/}
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <ViewVoicera style={styles.iconButtonContainer}>
            <Feather name="x" size={40} color={'white'} />
          </ViewVoicera>
          <TextVoicera style={styles.iconText}>Decline</TextVoicera>
        </Pressable>

        {/* Accept Button*/}
        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <ViewVoicera
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" size={40} color={'white'} />
          </ViewVoicera>
          <TextVoicera style={styles.iconText}>Accept</TextVoicera>
        </Pressable>
      </ViewVoicera>
    </ViewVoicera>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#7b4e80',
    paddingBottom: 50,
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
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
  iconText: {
    color: 'white',
  },
});
