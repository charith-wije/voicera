import {StyleSheet} from 'react-native';
import React from 'react';
import ViewVoicera from '../atoms/ViewVoicera';
import TextVoicera from '../atoms/TextVoicera';
import TextInputVoicera from '../atoms/TextInputVoicera';

const FormInputVoicera = ({children, style, ...props}) => {
  const {label, onChangeText, value, error} = props;
  return (
    <>
      <ViewVoicera style={styles.labelContainer}>
        <TextVoicera style={[styles.label]}>{label}</TextVoicera>
        {error ? (
          <TextVoicera style={[styles.error]}>{error}</TextVoicera>
        ) : null}
      </ViewVoicera>
      <TextInputVoicera
        {...props}
        onChangeText={onChangeText}
        value={value}
        style={styles.textInput}
      />
    </>
  );
};

export default FormInputVoicera;

const styles = StyleSheet.create({
  label: {
    color: '#424242',
    width: '45%',
    marginLeft: '5%',
  },
  textInput: {
    backgroundColor: '#e0e0de',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 14,
    width: '90%',
    textAlign: 'left',
    marginLeft: '5%',
  },
  labelContainer: {
    justifyContent: 'space-between',
  },
});
