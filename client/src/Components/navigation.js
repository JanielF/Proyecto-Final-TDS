// En tu archivo Navigation.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EjercicioScreen from '../components/ejercicio';
import HomeScreen from '../components/home';
import LecturaScreen from '../components/lectura';
import LoginScreen from '../components/login';
import MeditacionScreen from '../components/meditacion';
import RegisterScreen from '../components/register';
import HomeHabitat from './homehabit';
import CreateHabit from './CreateHabit';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ejercicio" component={EjercicioScreen} />
        <Stack.Screen name="Meditacion" component={MeditacionScreen} />
        <Stack.Screen name="Lectura" component={LecturaScreen} />
        <Stack.Screen name="HomeHabit" component={HomeHabitat} />
        <Stack.Screen name="CreateHabit" component={CreateHabit} 
          options={({ navigation }) => ({
            title: 'My Habits',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{marginRight: 10}}> 
                <FontAwesome name="cog" size={24} color="black"/>
              </TouchableOpacity>
            ),
            headerLeft: null
          })}
        />
        <Stack.Screen name='EditProfile' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
