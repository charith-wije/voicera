import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import ViewVoicera from '../atoms/ViewVoicera';
import TextVoicera from '../atoms/TextVoicera';

const CallsScreen = ({openCallModal}) => {
  useEffect(() => {
    // openCallModal(true);
  }, []);

  return (
    <ViewVoicera>
      <TextVoicera>CallsScreen</TextVoicera>
    </ViewVoicera>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({});
