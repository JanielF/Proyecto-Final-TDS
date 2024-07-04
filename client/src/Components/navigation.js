// En tu archivo Navigation.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../Screens/home';
import HomeHabitat from '../Screens/homehabit';
import EjercicioScreen from './ejercicio';
import LecturaScreen from './lectura';
import LoginScreen from './login';
import MeditacionScreen from './meditacion';
import RegisterScreen from './register';
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ejercicio" component={EjercicioScreen} />
        <Stack.Screen name="Meditacion" component={MeditacionScreen} />
        <Stack.Screen name="Lectura" component={LecturaScreen} />
        <Stack.Screen name="HomeHabit" component={HomeHabitat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
