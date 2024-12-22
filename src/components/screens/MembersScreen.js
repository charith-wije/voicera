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

import React, {useEffect, useState, useContext} from 'react';

import {AgoraContext} from '../../helpers/AgoraContext';

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

const MembersScreen = ({openCallModal, setCallee}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);
  const {join} = useContext(AgoraContext);
  useEffect(() => {
    const newMembers = members.filter(member =>
      member.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredMembers(newMembers);
  }, [searchTerm]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.page}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#696666"
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.searchInput}
        />
        <FlatList
          data={filteredMembers}
          renderItem={({item}) => (
            <Text
              onPress={() => {
                openCallModal(`audio`);
                setCallee(item.user_name);
                join();
              }}
              style={styles.memberName}>
              {item.user_name}
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
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
  },
});

export default MembersScreen;
