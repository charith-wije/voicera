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

import React, {useRef, useEffect, useState} from 'react';

// Import Agora SDK
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
  RtcConnection,
  IRtcEngineEventHandler,
} from 'react-native-agora';

// Define basic information
const appId = '53120207c8254eef8b10709a6a707e5c';
const token =
  '007eJxTYOCzEr6noBztf/TCRpOgUzsdtyxJXzYrQJ57yjG27xurKjwVGEyNDY0MjAzMky2MTE1SU9MskgwNzA0sE80SzQ3MU02T2flS0xsCGRnu6gYwMjJAIIjPz1CWn5mcWpSom5yRmJeXmsPAAADv1yC9';
const channelName = 'voicera-channel';
const uid = 0; // Local user Uid, no need to modify

const members = [
  {
    user_id: '1',
    user_name: 'ABC',
    user_email: 'abc@gmail.com',
  },

  {
    user_id: '2',
    user_name: 'BCD',
    user_email: 'bcd@gmail.com',
  },

  {
    user_id: '3',
    user_name: 'CDE',
    user_email: 'cde@gmail.com',
  },

  {
    user_id: '4',
    user_name: 'DEF',
    user_email: 'def@gmail.com',
  },

  {
    user_id: '5',
    user_name: 'EFG',
    user_email: 'efg@gmail.com',
  },

  {
    user_id: '6',
    user_name: 'FGH',
    user_email: 'fgh@gmail.com',
  },
];

const MembersScreen = () => {
  const agoraEngineRef = useRef(null); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // User role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // User prompt message
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
          showMessage('Successfully joined channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, uid) => {
          showMessage('Remote user ' + uid + ' joined');
          setRemoteUid(uid);
        },
        onUserOffline: (_connection, uid) => {
          showMessage('Remote user ' + uid + ' left the channel');
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
  // Render user interface
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video SDK Quickstart</Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join Channel
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave Channel
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={switchValue => {
            setIsHost(switchValue);
            if (isJoined) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined && isHost ? (
          <React.Fragment key={0}>
            {/* Create a local view using RtcSurfaceView */}
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            {/* Create a remote view using RtcSurfaceView */}
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {isJoined && !isHost ? 'Waiting for remote user to join' : ''}
          </Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
  // Display information
  function showMessage(msg) {
    setMessage(msg);
  }
};

// Define user interface styles
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center', backgroundColor: 'black'},
  scroll: {flex: 1, backgroundColor: 'black', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});
const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

// const MembersScreen = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMembers, setFilteredMembers] = useState(members);

//   useEffect(() => {
//     const newMembers = members.filter(member =>
//       member.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//     setFilteredMembers(newMembers);
//   }, [searchTerm]);
//   return (
//     <SafeAreaView>
//       <StatusBar barStyle={'dark-content'} />
//       <View style={styles.page}>
//         <TextInput
//           placeholder="Search..."
//           placeholderTextColor="#696666"
//           onChangeText={setSearchTerm}
//           value={searchTerm}
//           style={styles.searchInput}
//         />
//         <FlatList
//           data={filteredMembers}
//           renderItem={({item}) => (
//             <Text style={styles.memberName}>{item.user_name}</Text>
//           )}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     padding: 15,
//   },

//   memberName: {
//     color: 'black',
//     fontSize: 16,
//     marginVertical: 10,
//   },

//   separator: {
//     width: '100%',
//     height: 1,
//     backgroundColor: '#e0dcdc',
//   },

//   searchInput: {
//     backgroundColor: '#e0dcdc',
//     padding: 10,
//     borderRadius: 5,
//     color: 'black',
//   },
// });

export default MembersScreen;
