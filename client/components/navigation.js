// En tu archivo Navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/home';
import EjercicioScreen from '../components/ejercicio';
import MeditacionScreen from '../components/meditacion';
import LecturaScreen from '../components/lectura';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ejercicio" component={EjercicioScreen} />
        <Stack.Screen name="Meditacion" component={MeditacionScreen} />
        <Stack.Screen name="Lectura" component={LecturaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
