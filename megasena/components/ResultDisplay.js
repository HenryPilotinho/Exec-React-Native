import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultDisplay = ({ result }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (result.hits > 3) {
      const interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [result.hits]);

  let message = '';
  if (result.hits === 6) {
    message = 'SENA!!!';
  } else if (result.hits === 5) {
    message = 'QUINA!';
  } else if (result.hits === 4) {
    message = 'QUADRA!';
  } else {
    message = 'Não ganhou, tente novamente.';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Números sorteados: {result.numbers.join(', ')}</Text>
      <Text style={[styles.resultText, blink && styles.blink]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  blink: {
    color: 'red',
  },
});

export default ResultDisplay;