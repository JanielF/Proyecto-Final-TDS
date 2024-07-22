import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { updateHabit } from '../../Apis/habits';

const HabitDetailsModal = ({ visible, onDismiss, habit, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedHabit, setUpdatedHabit] = useState(habit);

  useEffect(() => {
    setUpdatedHabit(habit);
  }, [habit]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (updatedHabit?.name && updatedHabit?.description) {
      const success = await updateHabit(updatedHabit._id, updatedHabit, navigation);
      if (success) {
        setIsEditing(false);
        onDismiss();
      }
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Detalles del Hábito</Text>
          {updatedHabit ? (
            isEditing ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={updatedHabit.name}
                  onChangeText={(text) => setUpdatedHabit({ ...updatedHabit, name: text })}
                  placeholder="Nombre"
                />
                <TextInput
                  style={styles.input}
                  value={updatedHabit.description}
                  onChangeText={(text) => setUpdatedHabit({ ...updatedHabit, description: text })}
                  placeholder="Descripción"
                />
                <TextInput
                  style={styles.input}
                  value={updatedHabit.frequency}
                  onChangeText={(text) => setUpdatedHabit({ ...updatedHabit, frequency: text })}
                  placeholder="Frecuencia"
                />
              </View>
            ) : (
              <View>
                <Text style={styles.message}>{`Nombre: ${updatedHabit.name}`}</Text>
                <Text style={styles.message}>{`Descripción: ${updatedHabit.description}`}</Text>
                <Text style={styles.message}>{`Frecuencia: ${updatedHabit.frequency}`}</Text>
              </View>
            )
          ) : (
            <Text style={styles.message}>No se encontró el hábito</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isEditing ? '#007bff' : '#28a745' }]}
              onPress={handleEditToggle}
            >
              <Text style={styles.buttonText}>{isEditing ? 'Guardar' : 'Editar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545' }]}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default HabitDetailsModal;
