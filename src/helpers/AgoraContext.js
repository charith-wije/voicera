import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  PermissionsAndroid,
  Platform,
  Switch,
  ScrollView,
} from 'react-native';

import React, {useRef, useEffect, useState, createContext} from 'react';

// Import Agora SDK
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';
import {
  VOICERA_APP_ID,
  VOICERA_CHANNEL_NAME,
  VOICERA_TOKEN,
  VOICERA_UID,
} from '../config/config';

const AgoraContext = createContext();

// Define basic information
const appId = VOICERA_APP_ID;
const token = VOICERA_TOKEN;
const channelName = VOICERA_CHANNEL_NAME;
const uid = VOICERA_UID; // Local user Uid, no need to modify

const AgoraProvider = ({children}) => {
  const agoraEngineRef = useRef(null); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [isHost, setIsHost] = useState(false); // User role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // User prompt message
  const [muteRemoteUser, setMuteremoteUser] = useState(false);
  const [offCameraRemoteUser, setOffCameraRemoteUser] = useState(false);
  const eventHandler = useRef(null); // Implement callback functions
  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current);
      agoraEngineRef.current?.release();
    };
  }, []);
  // Define the setupVideoSDKEngine method called when the App starts
  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after obtaining device permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      eventHandler.current = {
        onJoinChannelSuccess: () => {
          // showMessage('Successfully joined channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, uid) => {
          // showMessage('Remote user ' + uid + ' joined');
          setRemoteUid(uid);
        },
        onUserMuteAudio: (uid, muted) => {
          // showMessage(`User ${uid} ${muted ? 'muted' : 'unmuted'} their microphone`);
          setMuteremoteUser(currentState => !currentState);
        },
        onUserMuteVideo: (uid, muted) => {
          setOffCameraRemoteUser(currentState => !currentState);
        },
        onUserOffline: (_connection, uid) => {
          // showMessage('Remote user ' + uid + ' left the channel');
          setRemoteUid(0);
        },
      };
      // Register the event handler
      agoraEngine.registerEventHandler(eventHandler.current);
      // Initialize the engine
      agoraEngine.initialize({
        appId: appId,
      });
      // Enable local video
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  // Switch Camera
  const switchCamera = () => {
    agoraEngineRef.current?.switchCamera();
  };

  // Turn On and Off Camera
  const onOffCamera = newStatus => {
    agoraEngineRef.current?.muteLocalVideoStream(newStatus);
  };

  // Turn On and Off Microphone
  const onOffMicrophone = newStatus => {
    agoraEngineRef.current?.muteLocalAudioStream(newStatus);
  };

  // Define the join method called after clicking the join channel button
  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      if (isHost) {
        // Start preview
        agoraEngineRef.current?.startPreview();
        // Join the channel as a broadcaster
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileCommunication,
          // Set user role to broadcaster
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          // Publish audio collected by the microphone
          publishMicrophoneTrack: true,
          // Publish video collected by the camera
          publishCameraTrack: true,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
          // Automatically subscribe to all video streams
          autoSubscribeVideo: true,
        });
      } else {
        // Join the channel as an audience
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileCommunication,
          // Set user role to audience
          clientRoleType: ClientRoleType.ClientRoleAudience,
          // Do not publish audio collected by the microphone
          publishMicrophoneTrack: true,
          // Do not publish video collected by the camera
          publishCameraTrack: true,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
          // Automatically subscribe to all video streams
          autoSubscribeVideo: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
      // Call leaveChannel method to leave the channel
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  return (
    <AgoraContext.Provider
      value={{
        isJoined,
        remoteUid,
        message,
        isHost,
        muteRemoteUser,
        offCameraRemoteUser,
        join,
        leave,
        setIsHost,
        switchCamera,
        onOffCamera,
        onOffMicrophone,
      }}>
      {children}
    </AgoraContext.Provider>
  );
};

export {AgoraProvider, AgoraContext};
