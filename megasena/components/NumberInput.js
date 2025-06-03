import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const NumberInput = ({ value, onChangeText, index }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholder={`Número ${index + 1}`}
      placeholderTextColor="white" // Cor do placeholder
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    textAlign: 'center',
    backgroundColor: 'black', // Fundo preto
    color: 'white', // Cor do texto
    paddingHorizontal: 10, 
    paddingVertical: 5,
  },
});

export default NumberInput;