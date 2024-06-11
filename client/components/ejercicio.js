import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const EjercicioScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
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
    width: '90%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default EjercicioScreen;
