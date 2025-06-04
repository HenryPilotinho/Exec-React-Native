import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Dados dos Sabres de Luz Principais do Filme
const lightsabersData = [
  {
    owner: 'Anakin Skywalker',
    color: 'Azul',
    colorHex: '#0077CC', // Cor aproximada para estilo
    notes: 'O sabre padrão de Anakin como Cavaleiro Jedi. Usado em muitos duelos, incluindo contra Dookan e Obi-Wan (onde é perdido).'
  },
  {
    owner: 'Obi-Wan Kenobi',
    color: 'Azul',
    colorHex: '#0077CC',
    notes: 'O terceiro sabre construído por Obi-Wan, usado durante as Guerras Clônicas e no duelo contra Anakin/Vader em Mustafar.'
  },
  {
    owner: 'Yoda',
    color: 'Verde',
    colorHex: '#22AA22',
    notes: 'Um shoto sabre (lâmina curta) verde, adequado ao tamanho de Yoda. Usado no duelo contra Darth Sidious.'
  },
  {
    owner: 'Mace Windu',
    color: 'Roxo',
    colorHex: '#9400D3', // Violeta
    notes: 'Um sabre único com lâmina roxa (devido ao cristal Hurrikaine). Usado no confronto com Palpatine, onde é perdido.'
  },
  {
    owner: 'Darth Sidious / Palpatine',
    color: 'Vermelho',
    colorHex: '#CC0000',
    notes: 'Mantido escondido, revelado em seu duelo contra os Mestres Jedi (incluindo Mace Windu) e Yoda. Possui um design elegante.'
  },
   {
    owner: 'Conde Dookan / Darth Tyranus',
    color: 'Vermelho',
    colorHex: '#CC0000',
    notes: 'Característico por seu cabo curvo, permitindo um estilo de luta mais refinado. Usado no início do filme até sua morte.'
  },
  {
    owner: 'General Grievous',
    color: 'Variadas (Azul/Verde)',
    colorHex: '#777777', // Cinza para representar a coleção
    notes: 'Grievous colecionava sabres de Jedi que ele matou. No filme, ele utiliza principalmente um par de sabres azuis e verdes.'
  },
];

export default function LightsabersScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sabres de Luz Notáveis</Text>
        {lightsabersData.map((saber, index) => (
          <View key={index} style={styles.saberItem}>
            <Text style={styles.saberOwner}>{saber.owner}</Text>
            <Text style={styles.saberInfo}>
              Cor da Lâmina: <Text style={{ color: saber.colorHex, fontWeight: 'bold' }}>{saber.color}</Text>
            </Text>
            <Text style={styles.saberNotes}>{saber.notes}</Text>
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
  saberItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', // Sombra sutil (iOS)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Sombra sutil (Android)
  },
  saberOwner: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111', // Quase preto
    marginBottom: 8,
  },
  saberInfo: {
     fontSize: 16,
     color: '#555', // Cinza escuro
     marginBottom: 5,
  },
   saberNotes: {
    fontSize: 15,
    color: '#666', // Cinza médio
    lineHeight: 21,
    textAlign: 'justify',
  },
});