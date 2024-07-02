import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookIcon = () => (
  <Image source={require('../assets/libro.png')} style={styles.icon} />
);

const DumbbellIcon = () => (
  <Image source={require('../assets/dumbell.png')} style={styles.icon} />
);

const MedalIcon = () => (
  <Image source={require('../assets/meditacion.png')} style={styles.icon} />
);

const Component = () => {
  const navigation = useNavigation();

  const handleStartExercise = () => {
    navigation.navigate('Ejercicio');
  };

  const handleStartMeditation = () => {
    navigation.navigate('Meditacion');
  };

  const handleStartReading = () => {
    navigation.navigate('Lectura');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Transforma tus hábitos</Text>
        <Text style={styles.description}>
          Descubre cómo nuestra aplicación puede ayudarte a desarrollar y mantener hábitos saludables que transformarán tu vida.
        </Text>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.card} onPress={handleStartExercise}>
          <DumbbellIcon />
          <Text style={styles.cardTitle}>Ejercicio</Text>
          <Text style={styles.cardDescription}>Mantén un registro de tus sesiones de ejercicio y monitorea tu progreso.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleStartMeditation}>
          <MedalIcon />
          <Text style={styles.cardTitle}>Meditación</Text>
          <Text style={styles.cardDescription}>Desarrolla una práctica de meditación diaria y mejora tu bienestar mental.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleStartReading}>
          <BookIcon />
          <Text style={styles.cardTitle}>Lectura</Text>
          <Text style={styles.cardDescription}>Lleva un registro de los libros que lees y establece objetivos de lectura.</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
  gridContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#666666',
  },
  settingsButton: {
    width: '90%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 25,
  },
  settingsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});

export default Component;
