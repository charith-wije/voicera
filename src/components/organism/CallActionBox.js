import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AgoraContext} from '../../helpers/AgoraContext';

const CallActionBox = ({leaveCall, callType}) => {
  const {switchCamera, onOffCamera, onOffMicrophone} = useContext(AgoraContext);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

  useEffect(() => {
    if (callType == 'video') onOffCamera(isCameraOn);
  }, [isCameraOn]);

  useEffect(() => {
    onOffMicrophone(isMicrophoneOn);
  }, [isMicrophoneOn]);

  const onReverseCamera = () => {
    if (callType == 'video') switchCamera();
  };

  const onToggleCamera = () => {
    if (callType == 'video') setIsCameraOn(currentValue => !currentValue);
  };

  const onToggleMicrophone = () => {
    setIsMicrophoneOn(currentValue => !currentValue);
  };

  const onHangup = () => {
    leaveCall();
  };

  return (
    <View style={styles.buttonsContainer}>
      <Pressable
        onPress={onReverseCamera}
        style={[styles.iconButton, {opacity: callType === 'video' ? 1 : 0.5}]}>
        <Ionicons name="camera-reverse" size={38} color={'white'} />
      </Pressable>

      <Pressable
        onPress={onToggleCamera}
        style={[styles.iconButton, {opacity: callType === 'video' ? 1 : 0.5}]}>
        <MaterialIcons
          name={isCameraOn ? 'camera' : 'camera-off'}
          size={38}
          color={'white'}
        />
      </Pressable>

      <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialIcons
          name={isMicrophoneOn ? 'microphone' : 'microphone-off'}
          size={38}
          color={'white'}
        />
      </Pressable>

      <Pressable
        onPress={onHangup}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialIcons name="phone-hangup" size={38} color={'white'} />
      </Pressable>
    </View>
  );
};

export default CallActionBox;

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});
