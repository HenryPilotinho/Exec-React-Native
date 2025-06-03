import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputArea from './components/InputArea';
import ResultadoAnalise from './components/ResultadoAnalise';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [analise, setAnalise] = useState(null);

  const analisarTexto = (texto) => {
    setInputText(texto);
    const palavras = texto.toLowerCase().split(/\s+/).filter(Boolean);
    let numVogais = 0;
    let numConsoantes = 0;
    const palindromosEncontrados = [];
    const vogais = 'aeiouáéíóúàèìòùãõâêîôû';

    for (const char of texto.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        if (vogais.includes(char)) {
          numVogais++;
        } else {
          numConsoantes++;
        }
      }
    }

    palavras.forEach(palavra => {
      const palavraLimpa = palavra.replace(/[^a-z]/g, '');
      if (palavraLimpa.length > 1 && palavraLimpa === palavraLimpa.split('').reverse().join('')) {
        palindromosEncontrados.push(palavra);
      }
    });

    setAnalise({
      numVogais,
      numConsoantes,
      palindromos: palindromosEncontrados,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analisador de Palavras</Text>
      <InputArea onAnalisar={analisarTexto} />
      {analise && <ResultadoAnalise resultado={analise} inputText={inputText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray', // Fundo cinza
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Texto branco para melhor contraste
  },
});