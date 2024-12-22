import {Text} from 'react-native';
import React from 'react';

const TextVoicera = ({children, style, ...props}) => {
  return (
    <Text style={[style]} {...props}>
      {children}
    </Text>
  );
};

export default TextVoicera;
