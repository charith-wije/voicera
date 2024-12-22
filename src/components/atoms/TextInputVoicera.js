import {TextInput} from 'react-native';
import React from 'react';

const TextInputVoicera = ({children, style, onChangeText, value, ...props}) => {
  return (
    <TextInput
      style={[style]}
      value={value}
      onChangeText={onChangeText}
      {...props}>
      {children}
    </TextInput>
  );
};

export default TextInputVoicera;
