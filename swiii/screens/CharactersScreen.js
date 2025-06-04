import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const characters = [
  { name: 'Anakin Skywalker / Darth Vader', description: 'O Cavaleiro Jedi profetizado que sucumbe ao lado sombrio, tornando-se um Lorde Sith.' },
  { name: 'Obi-Wan Kenobi', description: 'Mestre Jedi e mentor de Anakin, luta para salvar seu amigo e a República.' },
  { name: 'Padmé Amidala', description: 'Senadora e esposa secreta de Anakin, cuja segurança se torna a obsessão de Anakin.' },
  { name: 'Palpatine / Darth Sidious', description: 'O Chanceler da República e Lorde Sith que manipula a galáxia para formar o Império.' },
  { name: 'Yoda', description: 'Grande Mestre Jedi que lidera o Conselho Jedi e enfrenta Palpatine.' },
  { name: 'Mace Windu', description: 'Mestre Jedi influente que desconfia de Palpatine e tenta prendê-lo.' },
  { name: 'General Grievous', description: 'Comandante ciborgue do exército Separatista.' },
  { name: 'Conde Dookan / Darth Tyranus', description: 'Lorde Sith e líder Separatista, aprendiz de Sidious.' },
  { name: 'R2-D2 & C-3PO', description: 'Droides leais que acompanham os heróis em suas aventuras.' },
];

export default function CharactersScreen() {
  return (
    <ScrollView style={styles.container}>
       <View style={styles.content}>
        <Text style={styles.title}>Personagens Principais</Text>
        {characters.map((char, index) => (
          <View key={index} style={styles.characterItem}>
            <Text style={styles.characterName}>{char.name}</Text>
            <Text style={styles.characterDescription}>{char.description}</Text>
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
  characterItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Preto para nome
  },
  characterDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
});