import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import ViewVoicera from '../atoms/ViewVoicera';
import TextVoicera from '../atoms/TextVoicera';

const ChatsScreen = ({openCallModal}) => {
  useEffect(() => {
    // openCallModal(true);
  }, []);
  return (
    <ViewVoicera>
      <TextVoicera>ChatsScreen</TextVoicera>
    </ViewVoicera>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
