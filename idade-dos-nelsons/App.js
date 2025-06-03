import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function App() {
  const [dataNascimento, setDataNascimento] = useState('');
  const [idadeAnos, setIdadeAnos] = useState('');
  const [idadeMeses, setIdadeMeses] = useState('');
  const [idadeDias, setIdadeDias] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [erroData, setErroData] = useState(false);

  const calcularIdade = () => {
    if (!dataNascimento) {
      alert('Por favor, insira a data de nascimento.');
      return;
    }

    const partesData = dataNascimento.split('/');
    if (partesData.length !== 3) {
      setErroData(true);
      return;
    }

    const diaNascimento = parseInt(partesData[0]);
    const mesNascimento = parseInt(partesData[1]) - 1; // Mês em JavaScript é de 0 a 11
    const anoNascimento = parseInt(partesData[2]);

    if (isNaN(diaNascimento) || isNaN(mesNascimento) || isNaN(anoNascimento) ||
        diaNascimento < 1 || diaNascimento > 31 ||
        mesNascimento < 0 || mesNascimento > 11 ||
        anoNascimento > new Date().getFullYear()) {
      setErroData(true);
      return;
    }

    setErroData(false);

    const dataNasc = new Date(anoNascimento, mesNascimento, diaNascimento);
    const dataAtual = new Date();

    let diffAnos = dataAtual.getFullYear() - dataNasc.getFullYear();
    let diffMeses = dataAtual.getMonth() - dataNasc.getMonth();
    let diffDias = dataAtual.getDate() - dataNasc.getDate();

    if (diffMeses < 0 || (diffMeses === 0 && diffDias < 0)) {
      diffAnos--;
      diffMeses += 12;
    }

    if (diffDias < 0) {
      const ultimoDiaMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
      diffDias += ultimoDiaMesAnterior;
      diffMeses--;
      if (diffMeses < 0) {
        diffMeses = 11;
      }
    }

    setIdadeAnos(diffAnos);
    setIdadeMeses(diffMeses);
    setIdadeDias(diffDias);

    if (diffAnos <= 19) {
      setClassificacao('Jovem Nelson');
    } else if (diffAnos <= 59) {
      setClassificacao('Nelson Adulto');
    } else {
      setClassificacao('Ancient Nelson');
    }
  };

 return (
    <View style={styles.container}>
      <Text style={styles.label}>Qual Nelson tu é?</Text>
      <Text style={styles.label}>Data de Nascimento (DD/MM/AAAA):</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setDataNascimento(text)}
        value={dataNascimento}
        keyboardType="numeric"
        placeholder="Ex: 15/01/1990"
        maxLength={10}
      />
      {erroData && (
        <Text style={styles.erroText}>Por favor, insira uma data válida no formato DD/MM/AAAA.</Text>
      )}
      <Button title="Calcular Nelson" onPress={calcularIdade} />

      {idadeAnos !== '' && !erroData && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoText}>Idade: {idadeAnos} anos, {idadeMeses} meses e {idadeDias} dias</Text>
          <Text style={styles.resultadoText}>Classificação: {classificacao}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  erroText: {
    color: 'red',
    marginBottom: 10,
  },
  resultadoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultadoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;