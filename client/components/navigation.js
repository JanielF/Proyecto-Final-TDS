// En tu archivo Navigation.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EjercicioScreen from '../components/ejercicio';
import HomeScreen from '../components/home';
import LecturaScreen from '../components/lectura';
import LoginScreen from '../components/login';
import MeditacionScreen from '../components/meditacion';
import RegisterScreen from '../components/register';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ejercicio" component={EjercicioScreen} />
        <Stack.Screen name="Meditacion" component={MeditacionScreen} />
        <Stack.Screen name="Lectura" component={LecturaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
