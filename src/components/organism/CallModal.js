import {Button, Modal, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import CallActionBox from './CallActionBox';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AgoraContext} from '../../helpers/AgoraContext';
import {RtcSurfaceView} from 'react-native-agora';
import {useSelector} from 'react-redux';

const CallModal = ({visible, onClose, callee = '0'}) => {
  const [muteAudioRemoteUser, setAudioMuteRemoteUser] = useState(false);
  const [muteVideoRemoteUser, setVideoMuteRemoteUser] = useState(false);

  const {callType} = useSelector(state => state.callModal);

  const {
    isJoined,
    remoteUid,
    message,
    isHost,
    join,
    leave,
    setIsHost,
    muteRemoteUser,
    offCameraRemoteUser,
  } = useContext(AgoraContext);

  useEffect(() => {
    setAudioMuteRemoteUser(!muteAudioRemoteUser);
    setVideoMuteRemoteUser(!offCameraRemoteUser);
  }, [muteRemoteUser, offCameraRemoteUser]);

  const onDecline = () => {
    onClose();
    leave();
  };

  console.log(callType, 'pp');

  const onAccept = () => {
    console.warn('on Accept');
    join();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      {isJoined && (
        <View style={styles.pageJoined}>
          {isJoined && remoteUid !== 0 && (
            <View style={{flex: 1}}>
              {callType === 'video' && (
                <RtcSurfaceView canvas={{uid: remoteUid}} style={{flex: 1}} />
              )}
              {callType === 'audio' && (
                <View style={{flex: 1, backgroundColor: 'black'}} />
              )}
              <View style={styles.remoteUserAudioVideoStatus}>
                {callType === 'video' && (
                  <MaterialIcons
                    name={muteVideoRemoteUser ? 'camera-off' : 'camera'}
                    size={38}
                    color={'white'}
                  />
                )}
                <MaterialIcons
                  name={muteAudioRemoteUser ? 'microphone-off' : 'microphone'}
                  size={38}
                  color={'white'}
                />
              </View>
            </View>
          )}
          <View style={styles.cameraPreviewJoined}>
            {isJoined && callType === 'video' && (
              <RtcSurfaceView canvas={{uid: 0}} style={{flex: 1}} />
            )}
            {isJoined && callType === 'audio' && (
              <View style={{flex: 1, backgroundColor: 'black'}} />
            )}
          </View>

          <CallActionBox leaveCall={onDecline} callType={callType} />
        </View>
      )}
      {!isJoined && (
        <View style={styles.page}>
          <View style={styles.cameraPreview}>
            <Text style={styles.name}>{callee}</Text>
            <Text style={styles.phoneNumber}>Video Call...</Text>
          </View>
          <Button title="Close" onPress={onClose} />

          <CallActionBox leaveCall={onDecline} />
        </View>
      )}
    </Modal>
  );
};

export default CallModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
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
  root: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#7b4e80',
    paddingBottom: 50,
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
  pageJoined: {
    flex: 1,
    backgroundColor: '#7b4e80',
  },
  cameraPreviewJoined: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#ffff6e',
  },
  remoteUserAudioVideoStatus: {
    width: '30%',
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
