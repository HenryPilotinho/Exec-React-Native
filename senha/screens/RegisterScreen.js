import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { patients } from '../data'; // Importa a lista de pacientes

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Masculino'); // Valor inicial

  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !age) {
      Alert.alert('Erro', 'Por favor, preencha nome e idade.');
      return;
    }
    if (isNaN(parseInt(age)) || parseInt(age) < 0) {
      Alert.alert('Erro', 'Idade inválida. Deve ser um número positivo.');
      return;
    }

    const newPatient = {
      id: uuidv4(),
      name,
      age: parseInt(age),
      sex,
    };

    patients.push(newPatient); // Adiciona o novo paciente à lista
    Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
    setName('');
    setAge('');

    // Opcional: Navegar para a tela de gerar senha após o cadastro
    // navigation.navigate('GeneratePassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Sexo:</Text>
      <Picker
        selectedValue={sex}
        style={styles.picker}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>

      <Button title="Salvar Cadastro" onPress={handleRegister} />

      <View style={styles.navigationButtons}>
        <Button
          title="Ir para Gerar Senha"
          onPress={() => navigation.navigate('GeneratePassword')}
        />
        <Button
          title="Ir para Chamar Senha"
          onPress={() => navigation.navigate('CallPassword')}
        />
      </View>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  navigationButtons: {
    marginTop: 30,
    gap: 10, // Espaçamento entre os botões
  },
});