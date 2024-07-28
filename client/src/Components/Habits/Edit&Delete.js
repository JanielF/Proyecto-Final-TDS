import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { deleteHabit, updateHabit } from '../../Apis/habits';
const EditHabitModal = ({ visible, onDismiss, habit, onDelete }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setFrequency(habit.frequency);
      setIsEditing(false);
    }
  }, [habit]);

  const handleSave = async () => {
    setIsEditing(false);
    const response = await updateHabit(habit._id, name, description, frequency);
    if(response){
      Alert.alert('Hábito actualizado exitosamente');
      onDismiss();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Hábito",
      "¿Desea eliminar el hábito?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            deleteHabit(habit._id);
            onDismiss();
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{isEditing ? "Editar Hábito" : "Detalles del Hábito"}</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            editable={isEditing}
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{
              label: 'Selecciona la frecuencia',
              value: null,
            }}
            value={frequency}
            onValueChange={(value) => setFrequency(value)}
            items={[
              { label: 'Diario', value: 'daily' },
              { label: 'Semanal', value: 'weekly' },
              { label: 'Mensual', value: 'monthly' },
            ]}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isEditing ? styles.saveButton : styles.editButton}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>{isEditing ? "Guardar" : "Editar"}</Text>
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
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      color: '#333333',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      color: '#333333',
      paddingRight: 30,
   },
});

export default EditHabitModal;
