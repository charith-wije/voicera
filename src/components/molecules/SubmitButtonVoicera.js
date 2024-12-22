import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const SubmitButtonVoicera = ({children, style, submitting, ...props}) => {
  const {label, onPress} = props;
  return (
    <TouchableOpacity
      style={[
        styles.touchable,
        {backgroundColor: submitting ? '#ebda88' : '#f5cd05'},
      ]}
      onPress={!submitting ? onPress : null}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButtonVoicera;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4a4a49',
  },
  touchable: {
    paddingVertical: 16,
    backgroundColor: '#f5cd05',
    borderRadius: 10,
  },
});
