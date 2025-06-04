import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';

const Tab = createBottomTabNavigator();

// Dados de exemplo para o cardápio (mantido aqui para simplicidade)
const menuData = {
  Pizza: [
    { id: 'p1', name: 'Margherita', description: 'Molho de tomate, mussarela, manjericão', price: 'R$ 35,00'},
    { id: 'p2', name: 'Pepperoni', description: 'Molho de tomate, mussarela, pepperoni', price: 'R$ 40,00'},
    { id: 'p3', name: 'Calabresa', description: 'Molho de tomate, mussarela, calabresa, cebola', price: 'R$ 38,00'},
  ],
  Hamburger: [
    { id: 'h1', name: 'Clássico', description: 'Pão, carne, queijo, alface, tomate, cebola, molho especial', price: 'R$ 28,00'},
    { id: 'h2', name: 'Cheeseburger', description: 'Pão, carne, queijo', price: 'R$ 25,00'},
    { id: 'h3', name: 'Bacon Burger', description: 'Pão, carne, queijo, bacon, molho barbecue', price: 'R$ 32,00' },
  ],
  Bebidas: [
    { id: 'b1', name: 'Refrigerante Lata', price: 'R$ 5,00'},
    { id: 'b2', name: 'Suco Natural', price: 'R$ 7,00' },
    { id: 'b3', name: 'Água Mineral', price: 'R$ 3,00' },
  ],
};



// Componente para renderizar um item do cardápio (reutilizado)
function MenuItem({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </View>
  );
}

// Tela para exibir a categoria de Pizza
function PizzaScreen() {
  const pizzaItems = menuData.Pizza || [];
  const renderItem = ({ item }) => <MenuItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={pizzaItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

// Tela para exibir a categoria de Hamburger
function HamburgerScreen() {
  const hamburgerItems = menuData.Hamburger || [];
  const renderItem = ({ item }) => <MenuItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={hamburgerItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

// Tela para exibir a categoria de Bebidas
function BebidasScreen() {
  const bebidasItems = menuData.Bebidas || [];
  const renderItem = ({ item }) => <MenuItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={bebidasItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

// --- Componente Principal do App ---

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pizza" component={PizzaScreen} />
        <Tab.Screen name="Hamburger" component={HamburgerScreen} />
        <Tab.Screen name="Bebidas" component={BebidasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});