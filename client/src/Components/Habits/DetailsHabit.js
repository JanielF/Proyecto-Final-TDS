import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { DetailsHabit } from '../../Apis/habits';
import { useFocusEffect } from '@react-navigation/native';

const HabitDetailsModal = ({ visible, onDismiss, habitId }) => {
  const [habit, setHabit] = useState(null);

  const fetchHabit = useCallback(async () => {
    if (habitId) {
      const response = await DetailsHabit(habitId);
      setHabit(response);
    }
  }, [habitId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchHabit();
    }, [fetchHabit])
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Detalles del Hábito</Text>
          {habit ? (
            <View>
              <Text style={styles.message}>{`Nombre: ${habit.data.name}`}</Text>
              <Text style={styles.message}>{`Descripción: ${habit.data.description}`}</Text>
              <Text style={styles.message}>{`Frecuencia: ${habit.data.frequency}`}</Text>
              <Text style={styles.message}>{`Llevas ${habit.data.completedCount} veces completado`}</Text>
            </View>
          ) : (
            <Text style={styles.message}>No se encontró el hábito</Text>
          )}
        </View>
      </View>
    </Modal>
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
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 8,
  width: '80%',
  alignItems: 'center',
  position: 'relative',
},
closeButton: {
  position: 'absolute',
  top: 16,
  right: 16,
  padding: 8,
},
closeButtonText: {
  fontSize: 24,
  color: '#333',
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#333',
},
message: {
  fontSize: 18,
  marginBottom: 24,
  color: '#333',
  textAlign: 'center',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
},
});

export default HabitDetailsModal;