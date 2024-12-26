import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Pressable,
  Text,
} from 'react-native';

import React, {useEffect, useState, useContext} from 'react';

import {AgoraContext} from '../../helpers/AgoraContext';
import ViewVoicera from '../atoms/ViewVoicera';
import TextInputVoicera from '../atoms/TextInputVoicera';
import TextVoicera from '../atoms/TextVoicera';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const memberss = [
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

const MembersScreen = ({openCallModal, setCallee, setCall}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [unequeMembers, setUnequeMembers] = useState(null);
  const {join} = useContext(AgoraContext);
  // const [members, setMembers] = useState(null);

  const myName = auth().currentUser.displayName;

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const newMembers = filteredMembers?.filter(member => {
      return member._data.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setUnequeMembers(newMembers);
  }, [searchTerm]);

  const getUsers = async () => {
    const users = await firestore().collection('users').get();
    console.log(users._docs);
    const newMembers = users._docs?.filter(member => {
      if (member._data.name !== myName)
        return member._data.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    });
    setUnequeMembers(newMembers);
    setFilteredMembers(newMembers);
  };

  const renderItem = ({item}) => {
    return (
      // <TextVoicera
      //   onPress={() => {
      //     openCallModal(`audio`);
      //     setCallee(item._data.name);
      //     join();
      //   }}
      //   style={styles.memberName}>
      //   {item._data.name}
      // </TextVoicera>
      <View
        style={{
          with: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 6,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'grey',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginRight: 8,
              marginLeft: 5,
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
              }}>
              {item._data.name[0].toUpperCase()}
            </Text>
          </View>
          <Text style={{fontSize: 20, color: 'black'}}>
            {item._data.name[0].toUpperCase() + item._data.name.slice(1)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 4,
          }}>
          <Pressable onPress={() => {}} style={styles.iconButton}>
            <MaterialIcons name={'message'} size={24} color={'blue'} />
          </Pressable>
          <Pressable
            onPress={() => {
              setCallee(item._data.name);
              setCall('Voice');
              openCallModal(`audio`);
              join();
            }}
            style={styles.iconButton}>
            <MaterialIcons name={'phone'} size={25} color={'blue'} />
          </Pressable>
          <Pressable
            onPress={() => {
              setCallee(item._data.name);
              setCall('Video');
              openCallModal(`video`);
              join();
            }}
            style={styles.iconButton}>
            <MaterialIcons name={'video'} size={30} color={'blue'} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ViewVoicera style={styles.page}>
        <TextInputVoicera
          placeholder="Search..."
          placeholderTextColor="#696666"
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.searchInput}
        />
        {filteredMembers ? (
          <FlatList
            data={unequeMembers}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <ViewVoicera style={styles.separator} />
            )}
          />
        ) : (
          <TextVoicera>Loading...</TextVoicera>
        )}
      </ViewVoicera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },

  memberName: {
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0dcdc',
  },

  searchInput: {
    backgroundColor: '#e0dcdc',
    padding: 10,
    borderRadius: 5,
    color: 'black',
    marginBottom: 15,
  },

  iconButton: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MembersScreen;
