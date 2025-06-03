import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ResultadoAnalise = ({ resultado, inputText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Resultado da Análise:</Text>
      <Text style={styles.text}>Texto inserido: {inputText}</Text>
      <Text style={styles.text}>Número de vogais: {resultado.numVogais}</Text>
      <Text style={styles.text}>Número de consoantes: {resultado.numConsoantes}</Text>
      {resultado.palindromos.length > 0 && (
        <View style={styles.palindromosContainer}>
          <Text style={styles.palindromosTitle}>Palíndromos encontrados:</Text>
          {resultado.palindromos.map((palindromo, index) => (
            <Text key={index} style={styles.palindromoItem}>{palindromo}</Text>
          ))}
        </View>
      )}
      {resultado.palindromos.length === 0 && inputText.split(/\s+/).filter(Boolean).some(palavra => palavra.length > 1 && palavra.replace(/[^a-z]/g, '') === palavra.replace(/[^a-z]/g, '').split('').reverse().join('')) && (
        <Text style={styles.noPalindromo}>Nenhum palíndromo completo encontrado nas palavras.</Text>
      )}
       {resultado.palindromos.length === 0 && inputText.split(/\s+/).filter(Boolean).every(palavra => !(palavra.length > 1 && palavra.replace(/[^a-z]/g, '') === palavra.replace(/[^a-z]/g, '').split('').reverse().join(''))) && inputText.trim() !== '' && (
        <Text style={styles.noPalindromo}>Nenhuma palavra palíndromo encontrada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#444', // Cinza mais escuro para o fundo do resultado
    borderRadius: 8,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  text: {
    color: 'white',
    marginBottom: 5,
  },
  palindromosContainer: {
    marginTop: 10,
  },
  palindromosTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  palindromoItem: {
    marginLeft: 10,
    color: 'white',
  },
  noPalindromo: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#ccc',
  },
});

export default ResultadoAnalise;