import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Conversor = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kmh, setKmh] = useState('');
  const [mph, setMph] = useState('');

  const converterTemperatura = (valor) => {
    const f = (parseFloat(valor) * 9) / 5 + 32;
    setFahrenheit(isNaN(f) ? '' : f.toFixed(4));
    setCelsius(valor);
  };

  const converterVelocidade = (valor) => {
    const m = parseFloat(valor) * 0.621371;
    setMph(isNaN(m) ? '' : m.toFixed(4));
    setKmh(valor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Unidades</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Celsius (°C):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={celsius}
          onChangeText={converterTemperatura}
        />
        <Text style={styles.result}>{fahrenheit} °F</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>km/h:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={kmh}
          onChangeText={converterVelocidade}
        />
        <Text style={styles.result}>{mph} mph</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#fff',
  },
  result: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
});

export default Conversor;