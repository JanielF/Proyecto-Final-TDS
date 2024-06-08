import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const EjercicioScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ejercicio</Text>
        <Text style={styles.description}>
          Mantén un registro de tus sesiones de ejercicio y monitorea tu progreso.
        </Text>
      </View>
      <TouchableOpacity style={styles.card}>
        <Image source={require('../assets/dumbell.png')} style={styles.icon} />
        <Text style={styles.cardTitle}>Rutinas</Text>
        <Text style={styles.cardDescription}>Crea y personaliza tus rutinas de ejercicio.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Crear Rutina</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {/* Repite esto para las otras dos opciones */}
      <TouchableOpacity style={styles.backButton}>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666666',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default EjercicioScreen;
