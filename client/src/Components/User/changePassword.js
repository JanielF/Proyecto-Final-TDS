import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { ChangePassword } from '../../Apis/authapis';
import { useNavigation } from '@react-navigation/native';
import background from '../../../assets/background.jpg';
import globalStyles from '../../../assets/css/globalCss';
import CustomAlert from '../customAlert';
const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '', scree: ''});
  const navigation = useNavigation();
  const handleChangePassword = async () => {
    if(currentPassword === confirmPassword){
      setAlertVisible(true);
      setAlertMessage({ title: 'Error', message: 'La nueva contraseña no puede ser igual que la anterior', screen: ''});
      return;
    }
    if (currentPassword === '') {
      setAlertVisible(true);
      setAlertMessage({ title: 'Error', message: 'Debes introducir tu contraseña actual', screen: ''});
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlertVisible(true);
      setAlertMessage({ title: 'Error', message: 'Las contraseñas no coinciden', screen: ''});
      return;
    }
    try {
      const response = await ChangePassword(confirmPassword)
      if(response.success){
        setAlertVisible(true);
        setAlertMessage({ title: 'Contraseña Actualizada', message: `Nueva Contraseña: ${confirmPassword}`, screen: 'Settings'});
        setConfirmPassword('');
        setCurrentPassword('');
        setNewPassword('');
      }else{
        setAlertVisible(true);
        setAlertMessage({ title: 'Error', message: 'Contraseña actual incorrecta', screen: ''});
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ImageBackground source={background} style={globalStyles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <Text style={styles.subtitle}>Aquí puedes cambiar tu contraseña actual por una nueva.</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Nueva Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
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
    padding: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E2ECF4',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2ECF4',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
