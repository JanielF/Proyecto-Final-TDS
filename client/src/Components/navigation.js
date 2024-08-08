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
import EditHabitModal from './Habits/Edit&Delete';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={LoginScreen}
          options={
            { title: 'Login',
              headerStyle: { backgroundColor: '#f2e6ff'}
            }
          }
        />
        <Stack.Screen name="Register" component={RegisterScreen}           
          options={
            { title: 'Registrar',
              headerStyle: { backgroundColor: '#f2e6ff'}
            } 
          }
        /> 
        <Stack.Screen name="Home" component={Home} 
        options={{
          headerStyle: { backgroundColor: '#F8BBD0' },
          headerTintColor: '#FFFFFF',
        }} />
        <Stack.Screen name="HomeHabit" component={HomeHabitat}
          options={ ({navigation}) =>({
            headerTitle: 'Mis Hábitos',
            headerLeft: null, 
            headerStyle: { backgroundColor: '#f2e6ff'},
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
            { title: 'Crear Hábito',
              headerStyle: { backgroundColor: '#f2e6ff'}
            } 
          } 
        />
         <Stack.Screen name="Settings" component={SettingsScreen}
          options={
            { title: 'Configuración',
              headerStyle: { backgroundColor: '#f2e6ff'}
            }
          } 
        />
          <Stack.Screen name='Profile' component={ProfileScreen} 
            options={
              { title: 'Profile',
                headerStyle: { backgroundColor: '#f2e6ff'}
              } 
            }
          />
          <Stack.Screen name="HabitDetails" component={HabitDetailsModal} />
          <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} 
            options={
              { title: 'Cambiar Contraseña',
                headerStyle: { backgroundColor: '#f2e6ff'}
              } 
            }
          />
          <Stack.Screen name='EditHabit' component={EditHabitModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
