import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PatientCard = ({ patient, onPress, buttonText }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.info}>Idade: {patient.age}</Text>
        <Text style={styles.info}>Sexo: {patient.sex}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PatientCard;