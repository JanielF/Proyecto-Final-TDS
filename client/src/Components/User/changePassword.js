import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChangePasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <Text style={styles.subtitle}>Aquí puedes cambiar tu contraseña actual por una nueva.</Text>
      {/* Agregar aquí el formulario para cambiar la contraseña */}
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
});

export default ChangePasswordScreen;
