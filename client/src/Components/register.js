import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { RegisterFunc } from '../Apis/authapis';
import CustomAlert from './customAlert';
import background from '../../assets/background.jpg';
import globalStyles from '../../assets/css/globalCss';
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisibleter] = useState(false);
  const [alertMessage, setAlertMessage] = useState({title: '', message: '', screen: ''});
  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await RegisterFunc(username, email, password, name, lastname, age);
      if (response.success) {
        setAlertVisible(true);
        setAlertMessage({title: 'Registro', message: 'Usuario registrado con éxito', screen: 'Login'});
      } else {
        setAlertType('error');
        setAlertMessage({title: 'Error', message: 'Ha ocurrido un error'})
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error. Por favor, inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={background} style={globalStyles.background}>
    <View style={styles.container}>
    <Text style={globalStyles.title}>Bienvenido a nuestra app</Text>
    <Text style={globalStyles.subtituleLog}>Registrate para iniciar este nuevo camino.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#6DACC8',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
