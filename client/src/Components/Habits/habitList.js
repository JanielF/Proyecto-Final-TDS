import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import importData from './importData';
import { FontAwesome } from '@expo/vector-icons';
import HabitDetailsModal from './DetailsHabit'; // Importa el modal

const HabitList = ({ habits, navigation }) => {
  const habitSummary = {
    total: habits.length,
  };

  const [importantInfo, setImportantInfo] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const selectRandomInfo = () => {
    const randomIndex = Math.floor(Math.random() * importData.length);
    setImportantInfo(importData[randomIndex]);
  };

  useEffect(() => {
    selectRandomInfo();
  }, []);

  const openHabitDetails = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedHabit(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Hábitos</Text>
        <Text style={styles.subtitle}>
          Administra y monitorea tus hábitos diarios para mejorar tu estilo de vida.
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Resumen de Hábitos</Text>
        <Text style={styles.summaryItem}>Total de hábitos: {habitSummary.total}</Text>
      </View>

      {importantInfo && (
        <View style={styles.importantInfo}>
          <Text style={styles.importantInfoTitle}>{importantInfo.title}</Text>
          <Text style={styles.importantInfoText}>{importantInfo.text}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateHabit')}>
        <Text style={styles.createButtonText}>Crear Nuevo Hábito</Text>
      </TouchableOpacity>

      {habits.length > 0 ? (
        <FlatList
          data={habits}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.habitItem}
              onPress={() => openHabitDetails(item)} // Abre el modal con los detalles del hábito
            >
              <Text style={styles.habitText}>{item.name}</Text>
              <FontAwesome name='check' size={24} color='#007bff'/>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Tus Hábitos</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.noHabitsContainer}>
          <Text style={styles.noHabitsText}>No tienes hábitos registrados</Text>
          <Text style={styles.createHabitText}>Crea uno nuevo para empezar</Text>
        </View>
      )}

      <HabitDetailsModal
        visible={modalVisible}
        onDismiss={closeModal}
        habit={selectedHabit}
        navigation={navigation} // Asegúrate de pasar `navigation` si se necesita en el modal
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  summary: {
    backgroundColor: '#e5e7eb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  importantInfo: {
    backgroundColor: '#fff5e6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  importantInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#d97706',
  },
  importantInfoText: {
    fontSize: 16,
    color: '#d97706',
    marginBottom: 4,
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  habitItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitText: {
    fontSize: 16,
    color: '#333',
  },
  listHeader: {
    marginBottom: 8,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  noHabitsContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  noHabitsText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  createHabitText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default HabitList;
