import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const InputArea = ({ onAnalisar }) => {
  const [texto, setTexto] = useState('');

  const handleAnalisar = () => {
    onAnalisar(texto);
    setTexto('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma palavra ou frase"
        placeholderTextColor="#888" // Cor do placeholder para melhor visibilidade
        value={texto}
        onChangeText={setTexto}
      />
      <TouchableOpacity style={styles.button} onPress={handleAnalisar}>
        <Text style={styles.buttonText}>Analisar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#555', // Borda mais escura para o input
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white', // Fundo branco para o input
    color: 'black', // Cor do texto no input
  },
  button: {
    backgroundColor: 'red', // Botão vermelho
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InputArea;