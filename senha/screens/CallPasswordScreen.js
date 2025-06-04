import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  pendingPasswords,
  getNextPasswordForCall,
  currentCalledPassword,
  setCurrentlyCalledPassword,
} from '../data';

export default function CallPasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState(currentCalledPassword);
  const [queue, setQueue] = useState([]);
  const isFocused = useIsFocused();

  // Use useCallback to memoize this function.
  // It avoids creating a new function on every render, which can be useful
  // if this function were a dependency of another useEffect, though not strictly
  // necessary here as it's only called directly. It's good practice for functions
  // used inside useEffects.
  const updateQueueAndCurrentPassword = useCallback(() => {
    const sortedPending = [...pendingPasswords].sort((a, b) => {
      const priorityOrder = {
        'Geriatria': 1, 'Oftalmologia': 1,
        'Pediatria': 2, 'Neuropediatria': 2,
        'Cardiologia': 3, 'Ortopedia': 3,
        'Dermatologia': 4, 'Ginecologia/Urologia': 4,
        'Endocrinologia Pediátrica': 5, 'Psiquiatria Infantil e Adolescente': 5,
      };

      const priorityA = priorityOrder[a.specialty] || 99;
      const priorityB = priorityOrder[b.specialty] || 99;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return new Date(a.timestamp) - new Date(b.timestamp);
    });

    setQueue(sortedPending);
    setCurrentPassword(currentCalledPassword);
  }, []); // Empty dependency array because it only depends on the global mutable variables

  // The effect should only run when the screen is focused.
  // The state updates inside updateQueueAndCurrentPassword() will ensure the UI reflects
  // the current global data when this effect runs.
  useEffect(() => {
    if (isFocused) {
      updateQueueAndCurrentPassword();
    }
  }, [isFocused, updateQueueAndCurrentPassword]); // updateQueueAndCurrentPassword is now a dependency because it's memoized with useCallback

  const handleCallNextPassword = () => {
    const nextPassword = getNextPasswordForCall();

    if (nextPassword) {
      const index = pendingPasswords.findIndex(p => p.id === nextPassword.id);
      if (index > -1) {
        pendingPasswords.splice(index, 1);
      }

      setCurrentlyCalledPassword(nextPassword);
      // After modifying the global state, call updateQueueAndCurrentPassword to refresh local state
      updateQueueAndCurrentPassword();

      Alert.alert(
        'Chamando Senha',
        `Por favor, dirija-se ao consultório!\nSenha: ${nextPassword.password}\nPaciente: ${nextPassword.patientName}\nEspecialidade: ${nextPassword.specialty}`
      );
    } else {
      Alert.alert('Fila Vazia', 'Não há senhas para chamar no momento.');
      setCurrentPassword(null);
      setCurrentlyCalledPassword(null);
      updateQueueAndCurrentPassword(); // Ensure queue is cleared in UI
    }
  };

  const renderQueueItem = ({ item }) => (
    <View style={styles.queueItem}>
      <Text style={styles.queueText}>
        **{item.password}** - {item.patientName} ({item.specialty})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Chamada de Senhas</Text>

      <View style={styles.currentPasswordContainer}>
        <Text style={styles.currentPasswordLabel}>Senha Atual:</Text>
        <Text style={styles.currentPasswordValue}>
          {currentPassword ? currentPassword.password : 'Nenhuma'}
        </Text>
        {currentPassword && (
          <View style={styles.currentPasswordDetails}>
            <Text style={styles.currentPasswordInfo}>
              Paciente: {currentPassword.patientName}
            </Text>
            <Text style={styles.currentPasswordInfo}>
              Especialidade: {currentPassword.specialty}
            </Text>
          </View>
        )}
      </View>

      <Button title="Chamar Próxima Senha" onPress={handleCallNextPassword} />

      <Text style={styles.queueTitle}>Fila de Espera ({queue.length} senhas)</Text>
      {queue.length === 0 ? (
        <Text style={styles.noQueueText}>A fila de espera está vazia.</Text>
      ) : (
        <FlatList
          data={queue}
          renderItem={renderQueueItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.queueListContent}
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
  currentPasswordContainer: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#b2ebf2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  currentPasswordLabel: {
    fontSize: 18,
    color: '#00796b',
    marginBottom: 5,
  },
  currentPasswordValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 10,
  },
  currentPasswordDetails: {
    marginTop: 10,
    alignItems: 'center',
  },
  currentPasswordInfo: {
    fontSize: 16,
    color: '#00796b',
  },
  queueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  noQueueText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  queueListContent: {
    paddingBottom: 20,
  },
  queueItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  queueText: {
    fontSize: 16,
    color: '#333',
  },
});