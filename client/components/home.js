import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click en el Icono</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleStartMeditation}>
          <MedalIcon />
          <Text style={styles.cardTitle}>Meditación</Text>
          <Text style={styles.cardDescription}>Desarrolla una práctica de meditación diaria y mejora tu bienestar mental.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click en el Icono</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleStartReading}>
          <BookIcon />
          <Text style={styles.cardTitle}>Lectura</Text>
          <Text style={styles.cardDescription}>Lleva un registro de los libros que lees y establece objetivos de lectura.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click en el Icono</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '30%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333333',
  },
  cardDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#666666',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  settingsButton: {
    width: '100%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
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
    marginBottom: 20,
  },
});

export default Component;
