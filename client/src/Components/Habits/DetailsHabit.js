import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener este paquete instalado
import { DetailsHabit } from '../../Apis/habits';

const HabitDetailsModal = ({ visible, onDismiss, habitId }) => {
  const [habit, setHabit] = useState(null);

  const fetchHabit = useCallback(async () => {
    if (habitId) {
      const response = await DetailsHabit(habitId);
      setHabit(response);
    }
  }, [habitId]);

  useFocusEffect(
    useCallback(() => {
      fetchHabit();
    }, [fetchHabit])
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CloseButton onPress={onDismiss} />
          <Text style={styles.title}>Detalles del Hábito</Text>
          <HabitDetails habit={habit} />
        </View>
      </View>
    </Modal>
  );
};

const CloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <FontAwesome name="close" size={24} color="#333" />
  </TouchableOpacity>
);

const HabitDetails = ({ habit }) => {
  if (!habit) {
    return <Text style={styles.message}>No se encontró el hábito</Text>;
  }

  const { name, description, frequency, completedCount } = habit.data;

  return (
    <View>
      <View style={styles.detailRow}>
        <FontAwesome name="bookmark" size={20} color="#333" />
        <Text style={styles.message}>{name}</Text>
      </View>
      <View style={styles.detailRow}>
        <FontAwesome name="align-left" size={20} color="#333" />
        <Text style={styles.message}>{description}</Text>
      </View>
      <View style={styles.detailRow}>
        <FontAwesome name="calendar" size={20} color="#333" />
        <Text style={styles.message}>{`Frecuencia: ${frequency}`}</Text>
      </View>
      <View style={styles.detailRow}>
        <FontAwesome name="check-circle" size={20} color="#333" />
        <Text style={styles.message}>{`Completado: ${completedCount} veces`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#C1D7E1',
    padding: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    marginLeft: 10,
    color: '#0d0d0d',
  },
});

export default HabitDetailsModal;
