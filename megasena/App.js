import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import NumberInput from './components/NumberInput';
import ResultDisplay from './components/ResultDisplay';
import { generateMegaSenaNumbers, checkResult } from './components/GameLogic';

const App = () => {
  const [userNumbers, setUserNumbers] = useState(Array(6).fill(''));
  const [result, setResult] = useState(null);

  const handleNumberChange = (text, index) => {
    const newNumbers = [...userNumbers];
    newNumbers[index] = text;
    setUserNumbers(newNumbers);
  };

  const handlePlay = () => {
    const numbers = userNumbers.map(Number);
    if (numbers.some(isNaN) || numbers.length !== 6 || new Set(numbers).size !== 6) {
      Alert.alert('Erro', 'Por favor, insira 6 números válidos e únicos.');
      return;
    }

    const megaSenaNumbers = generateMegaSenaNumbers();
    const hits = checkResult(numbers, megaSenaNumbers);
    setResult({ numbers: megaSenaNumbers, hits });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mega-Sena</Text>
      {userNumbers.map((number, index) => (
        <NumberInput
          key={index}
          value={number}
          onChangeText={(text) => handleNumberChange(text, index)}
          index={index}
        />
      ))}
      <Button title="Jogar" onPress={handlePlay} />
      {result && <ResultDisplay result={result} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;