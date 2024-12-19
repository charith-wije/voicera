import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MembersScreen from '../components/screens/MembersScreen';
import CallsScreen from '../components/screens/CallsScreen';
import ChatsScreen from '../components/screens/ChatsScreen';
import CallingScreen from '../components/screens/CallingScreen';
import IncomingCallScreen from '../components/screens/IncomingCallScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator();

// Screen Names
const membersName = 'Members';
const callsName = 'Calls';
const chatsName = 'Chats';

const HomeNavigator = () => {
  return (
    <NavigationContainer>
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
          tabBarStyle: {backgroundColor: '#011f8c'},
          headerTitleAlign: 'center',
        })}>
        <BottomTab.Screen name="Members" component={MembersScreen} />
        <BottomTab.Screen
          name="Calls"
          component={IncomingCallScreen}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen name="Chats" component={ChatsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
