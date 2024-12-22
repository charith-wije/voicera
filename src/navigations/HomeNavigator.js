import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MembersScreen from '../components/screens/MembersScreen';
import CallsScreen from '../components/screens/CallsScreen';
import ChatsScreen from '../components/screens/ChatsScreen';
import CallingScreen from '../components/screens/CallingScreen';
import IncomingCallScreen from '../components/screens/IncomingCallScreen';
import CallScreen from '../components/screens/CallScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CallModal from '../components/organism/CallModal';
import {useDispatch} from 'react-redux';
import {updateCallType} from '../redux/reducers/CallModalReducer';

const BottomTab = createBottomTabNavigator();

// Screen Names
const membersName = 'Members';
const callsName = 'Calls';
const chatsName = 'Chats';

const HomeNavigator = () => {
  const [isCallModalVisible, setCallModalVisible] = useState(false);
  const [callee, setCallee] = useState('');

  const dispatch = useDispatch();

  const openCallModal = call => {
    setCallModalVisible(true);
    dispatch(updateCallType(call));
  };
  const closeCallModal = () => setCallModalVisible(false);

  return (
    <>
      <BottomTab.Navigator
        initialRouteName={membersName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let routName = route.name;
            if (routName === membersName) {
              iconName = focused ? 'people' : 'people-outline';
            }
            if (routName === callsName) {
              iconName = focused ? 'call' : 'call-outline';
            }
            if (routName === chatsName) {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#efb810',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {backgroundColor: '#333333'},
          headerTitleAlign: 'center',
        })}>
        <BottomTab.Screen name="Members">
          {() => (
            <MembersScreen
              openCallModal={openCallModal}
              setCallee={setCallee}
            />
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="Calls"
          options={{
            headerShown: false,
          }}>
          {() => <CallsScreen openCallModal={openCallModal} />}
        </BottomTab.Screen>

        <BottomTab.Screen name="Chats">
          {() => <ChatsScreen openCallModal={openCallModal} />}
        </BottomTab.Screen>
      </BottomTab.Navigator>
      <CallModal
        visible={isCallModalVisible}
        onClose={closeCallModal}
        callee={callee}
      />
    </>
  );
};

export default HomeNavigator;
