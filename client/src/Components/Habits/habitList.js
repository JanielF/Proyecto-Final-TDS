import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HabitDetailsModal from './DetailsHabit';
import EditHabitModal from './Edit&Delete';
import { completedHabit } from '../../Apis/habits';
import importData from './importData';
import CustomAlert from '../customAlert';

const HabitList = ({ habits, navigation, onRefresh }) => {
  const [importantInfo, setImportantInfo] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setalertMessage] = useState({ title: '', message: '', scree: '' });

  const selectRandomInfo = () => {
    const randomIndex = Math.floor(Math.random() * importData.length);
    setImportantInfo(importData[randomIndex]);
  };

  const handleGetCompleted = async (id) => {
    try {
      const response = await completedHabit(id);
      if (response.success) {
        setAlertVisible(true);
        setalertMessage({ title: 'Completado', message: "El Hábito fue completado" });
      } else {
        setAlertVisible(true);
        setalertMessage({ title: 'Error', message: "El Hábito no se pudo completar" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    selectRandomInfo();
  }, []);

  const openHabitDetails = (habit) => {
    setSelectedHabit(habit);
    setDetailsModalVisible(true);
  };

  const closeModal = (refresh = false) => {
    setSelectedHabit(null);
    setDetailsModalVisible(false);
    setEditModalVisible(false);
    if (refresh) {
      onRefresh();
    }
  };

  const openEditModal = (habit) => {
    setSelectedHabit(habit);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Hábitos</Text>
        <Text style={styles.subtitle}>
          Administra y monitorea tus hábitos diarios para mejorar tu estilo de vida.
        </Text>
      </View>

      {importantInfo && (
        <View style={styles.importantInfo}>
          <Text style={styles.importantInfoTitle}>{importantInfo.title}</Text>
          <Text style={styles.importantInfoText}>{importantInfo.text}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateHabit')}
      >
        <Text style={styles.createButtonText}>Crear Nuevo Hábito</Text>
      </TouchableOpacity>

      {habits.length > 0 ? (
        <FlatList
          data={habits}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.habitItem}
              onPress={() => openHabitDetails(item)}
            >
              <Text style={styles.habitText}>{item.name}</Text>
              <View style={styles.iconContainer}>
                <FontAwesome name="plus" size={16} color="#007bff" onPress={() => handleGetCompleted(item._id)} style={styles.icon} />
                <FontAwesome name="pencil" size={16} color="#007bff" onPress={() => openEditModal(item)} style={styles.icon} />
              </View>
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
        visible={detailsModalVisible}
        onDismiss={closeModal}
        habitId={selectedHabit?._id}
      />
      <EditHabitModal
        visible={editModalVisible}
        onDismiss={() => closeModal(true)}
        habit={selectedHabit}
      />
      <CustomAlert
        visible={alertVisible}
        title={alertMessage.title}
        message={alertMessage.message}
        onDismiss={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#aaaaee',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E6FA',
  },
  importantInfo: {
    backgroundColor: '#fff5e6',
    padding: 16,
    borderRadius: 15,
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
    backgroundColor: '#6DACC8',
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
    backgroundColor: '#e7f7fe',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 12, // Espacio entre los íconos
  },
  listHeader: {
    marginBottom: 8,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
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
