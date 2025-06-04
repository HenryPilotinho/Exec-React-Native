import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { patients, getSpecialtiesByAge, generateUniquePassword, pendingPasswords } from '../data';
import PatientCard from '../components/PatientCard'; // Importa o componente PatientCard

export default function GeneratePasswordScreen() {
  const [patientsList, setPatientsList] = useState([]);
  const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

  // Atualiza a lista de pacientes quando a tela é focada
  useEffect(() => {
    if (isFocused) {
      setPatientsList([...patients]); // Cria uma cópia para forçar a re-renderização
    }
  }, [isFocused]);

  const handleGeneratePassword = (patient) => {
    const specialties = getSpecialtiesByAge(patient.age);

    // Simplificação: se houver mais de uma especialidade, pegamos a primeira.
    // Em uma aplicação real, você mostraria uma seleção para o usuário.
    const selectedSpecialty = specialties[0];

    const newPassword = {
      id: patient.id + '-' + Date.now(), // ID único para a senha
      patientId: patient.id,
      patientName: patient.name,
      age: patient.age,
      password: generateUniquePassword(selectedSpecialty),
      specialty: selectedSpecialty,
      timestamp: new Date().toISOString(), // Para controle FIFO
    };

    pendingPasswords.push(newPassword);
    Alert.alert(
      'Senha Gerada!',
      `Senha: ${newPassword.password}\nEspecialidade: ${newPassword.specialty}\nPaciente: ${newPassword.patientName}`
    );
  };

  const renderItem = ({ item }) => (
    <PatientCard
      patient={item}
      onPress={() => handleGeneratePassword(item)}
      buttonText="Gerar Senha"
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes Cadastrados</Text>
      {patientsList.length === 0 ? (
        <Text style={styles.noPatientsText}>Nenhum paciente cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={patientsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noPatientsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20, // Espaço no final da lista
  },
});