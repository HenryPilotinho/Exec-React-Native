import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Make sure these imports DO NOT have curly braces {}
import RegisterScreen from './screens/RegisterScreen';
import GeneratePasswordScreen from './screens/GeneratePasswordScreen';
import CallPasswordScreen from './screens/CallPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen} // Ensure this points to the imported component, not a string or undefined
          options={{ title: 'Cadastro de Paciente' }}
        />
        <Stack.Screen
          name="GeneratePassword"
          component={GeneratePasswordScreen} // Same here
          options={{ title: 'Gerar Senha' }}
        />
        <Stack.Screen
          name="CallPassword"
          component={CallPasswordScreen} // And here
          options={{ title: 'Chamar Senha' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}