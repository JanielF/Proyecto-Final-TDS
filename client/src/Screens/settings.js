import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmModal from '../Components/User/logOut';
import { useNavigation } from '@react-navigation/native';
const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation(); 

  const logout = async () => {
    await AsyncStorage.clear();  
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={24} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('ChangePassword')}>
        <Icon name="lock" size={24} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={() => setShowModal(true)}>
        <Icon name="sign-out" size={24} color="#333" style={styles.icon} />
        <Text style={styles.optionText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={logout}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 16,
    color: '#333',
  },
  icon: {
    marginRight: 16,
  },
});

export default SettingsScreen;
