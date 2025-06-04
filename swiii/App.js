import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importando as telas de conteúdo
import PlotScreen from './screens/PlotScreen';
import CharactersScreen from './screens/CharactersScreen';
import LightsabersScreen from './screens/LightsabersScreen'; 
import MomentsScreen from './screens/MomentsScreen';

const Tab = createBottomTabNavigator();

// Componente Funcional para a Tela de Abertura 
function OpeningScreen({ onEnter }) {
  return (
    <Pressable style={styles.openingContainer} onPress={onEnter}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.openingMainTitle}>STAR WARS</Text>
      <Text style={styles.openingSubTitle}>EPISÓDIO III</Text>
      <Text style={styles.openingRevengeTitle}>A VINGANÇA DOS SITH</Text>
      <Text style={styles.tapToEnter}>Toque na tela para entrar</Text>
    </Pressable>
  );
}

// Componente Principal App
export default function App() {
  const [showOpeningScreen, setShowOpeningScreen] = useState(true);

  const handleEnterApp = () => {
    setShowOpeningScreen(false);
  };

  if (showOpeningScreen) {
    return <OpeningScreen onEnter={handleEnterApp} />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="Sinopse"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Sinopse') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Personagens') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Sabres') { 
              iconName = focused ? 'flash' : 'flash-outline'; // Usando ícone de raio como substituto
            } else if (route.name === 'Momentos') {
              iconName = focused ? 'film' : 'film-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFE81F',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#1a1a1a' },
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#FFE81F',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        {/* Ordem das abas: Sinopse, Personagens, Sabres, Momentos */}
        <Tab.Screen
          name="Sinopse"
          component={PlotScreen}
          options={{ title: 'Sinopse' }}
        />
        <Tab.Screen
          name="Personagens"
          component={CharactersScreen}
          options={{ title: 'Personagens' }}
        />
        {/* <<< Adicionar a nova Tab.Screen para Sabres de Luz */}
        <Tab.Screen
          name="Sabres"
          component={LightsabersScreen}
          options={{ title: 'Sabres de Luz' }}
        />
        <Tab.Screen
          name="Momentos"
          component={MomentsScreen}
          options={{ title: 'Momentos' }}
         />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos (mantidos como antes, incluindo os da tela de abertura)
const styles = StyleSheet.create({
  openingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  openingMainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(255, 232, 31, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  openingSubTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(255, 232, 31, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  openingRevengeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 232, 31, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: 40,
  },
   tapToEnter: {
    fontSize: 16,
    color: '#aaa',
    fontStyle: 'italic',
  },
});