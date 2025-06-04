import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const moments = [
  { title: 'Batalha de Coruscant', description: 'Abertura épica com o resgate do Chanceler Palpatine.' },
  { title: 'Morte do Conde Dookan', description: 'Anakin executa Dookan sob influência de Palpatine.' },
  { title: 'Anakin se torna Darth Vader', description: 'A nomeação de Anakin como Lorde Sith por Darth Sidious.' },
  { title: 'Ordem 66', description: 'A execução em massa dos Jedi pelos soldados clone.' },
  { title: 'Massacre no Templo Jedi', description: 'Vader lidera o ataque ao Templo Jedi.' },
  { title: 'Duelo em Mustafar', description: 'O confronto climático entre Obi-Wan Kenobi e Darth Vader.' },
  { title: 'Duelo no Senado', description: 'O embate entre Yoda e Darth Sidious.' },
  { title: 'Nascimento de Luke e Leia', description: 'Padmé dá à luz aos gêmeos antes de morrer.' },
  { title: 'A Ascensão do Império', description: 'Palpatine declara a formação do Império Galáctico.' },
  { title: 'A Reconstrução de Vader', description: 'Anakin recebe sua icônica armadura cibernética.' },
];

export default function MomentsScreen() {
  return (
    <ScrollView style={styles.container}>
       <View style={styles.content}>
        <Text style={styles.title}>Momentos Marcantes</Text>
        {moments.map((moment, index) => (
          <View key={index} style={styles.momentItem}>
            <Text style={styles.momentTitle}>{moment.title}</Text>
            <Text style={styles.momentDescription}>{moment.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
   content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
     color: '#333',
  },
  momentItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
     borderWidth: 1,
    borderColor: '#ddd',
  },
  momentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  momentDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
});