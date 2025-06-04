import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PlotScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Star Wars: Episódio III – A Vingança dos Sith</Text>
        <Text style={styles.subtitle}>Sinopse</Text>
        <Text style={styles.text}>
          Três anos após o início das Guerras Clônicas, os Jedi lideram o exército da República contra as forças Separatistas. O Chanceler Palpatine ascendeu ao poder na República Galáctica, secretamente manipulando ambos os lados do conflito como o Lorde Sith Darth Sidious.
        </Text>
        <Text style={styles.text}>
          O Cavaleiro Jedi Anakin Skywalker, separado de sua esposa secreta Padmé Amidala, é atormentado por visões de sua morte durante o parto. Palpatine seduz Anakin para o lado sombrio da Força, prometendo o poder de salvar Padmé, e o renomeia como Darth Vader.
        </Text>
        <Text style={styles.text}>
          Palpatine executa a Ordem 66, instruindo os soldados clone a exterminar seus generais Jedi. Ele se declara Imperador, transformando a República no Império Galáctico. Vader lidera um massacre no Templo Jedi e mata os líderes Separatistas em Mustafar.
        </Text>
        <Text style={styles.text}>
          Obi-Wan Kenobi confronta e derrota Vader em um duelo de sabres de luz em Mustafar, deixando-o gravemente ferido. Yoda confronta Palpatine, mas é forçado a recuar. Padmé dá à luz gêmeos, Luke e Leia, antes de morrer de coração partido. Os bebês são separados e escondidos do Império, enquanto Vader é reconstruído em seu icônico traje cibernético. A esperança reside nos filhos de Skywalker.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Um cinza claro para o fundo
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFE81F', // Amarelo Star Wars
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#555',
  },
});