import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { LoginFunc } from '../Apis/authapis';
import CustomAlert from './customAlert';
import background from '../../assets/background.jpg';
import globalStyles from '../../assets/css/globalCss';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setalertMessage] = useState({ title: '', message: '', scree: ''});
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await LoginFunc(username, password);
      if (response.success) {
        setalertMessage({title:"Inicio Sesión", message:"Inicio de sesion exitoso", screen: 'HomeHabit'});
        setAlertVisible(true);
      } else {
        setalertMessage({title:'Error', message:"Contraseña o usuario incorrecto", screen: ''});
        setAlertVisible(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={background} style={globalStyles.background}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Bienvenido a nuestra app</Text>
        <Text style={globalStyles.subtituleLog}>Descubre cómo nuestra aplicación puede simplificar tu vida.</Text>
        <TextInput
          style={globalStyles.inputlogin}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={globalStyles.inputlogin}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={globalStyles.buttonlog} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={globalStyles.buttonTextlog}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.registerButtonlog} onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.buttonTextlog}>Registrarse</Text>
        </TouchableOpacity>
        
        <CustomAlert 
          visible={alertVisible}
          title={alertMessage.title}
          message={alertMessage.message}
          onDismiss={() => setAlertVisible(false)}
          screen={alertMessage.screen}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
