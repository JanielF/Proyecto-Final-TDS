// En tu archivo Navigation.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Home from '../Screens/home';
import HomeHabitat from '../Screens/homehabit';
import LoginScreen from './login';
import RegisterScreen from './register';
import CreateHabit from './Habits/createHabit';
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingsScreen from '../Screens/settings';
import ProfileScreen from './User/profile';
import HabitDetailsModal from './Habits/DetailsHabit';
import ChangePasswordScreen from './User/changePassword';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeHabit" component={HomeHabitat}
          options={ ({navigation}) =>({
            headerLeft: null, title: 'Mis Hábitos', 
              centerTitle:true,
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Icon name="cog" size={24} color="#333" style={{marginRight: 16}}/>
                </TouchableOpacity>
              )
          })
          }
        />
        <Stack.Screen name='CreateHabit' component={CreateHabit}  
          options={
            { title: 'Crear Habitación', centerTitle:true } 
          } 
        />
         <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuración' }} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name="HabitDetails" component={HabitDetailsModal} />
          <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
