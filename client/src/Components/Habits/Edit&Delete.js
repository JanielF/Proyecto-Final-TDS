import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { deleteHabit, updateHabit } from '../../Apis/habits';
import CustomAlert from '../customAlert';

const EditHabitModal = ({ visible, onDismiss, habit, onDelete }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setalertMessage] = useState({ title: '', message: '', scree: ''});
 

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
    if (response.success) {
      setAlertVisible(true);
      setAlertMessage({title: 'Editado Correctamente', message: 'Hábito editado con éxito', screen: 'HabitHome'});
    } else {
      setAlertVisible(true);
      setalertMessage({title: 'Error', message: 'No se pudo editar el hábito', screen: ''});
    }
  };

  const handleDelete = async () => {
    setAlertMessage("¿Desea eliminar el hábito?");
    setAlertType('confirmation');
    setAlertVisible(true);
  };

  const confirmDelete = async () => {
    const response = await deleteHabit(habit._id);
    if (response.success) {
      setAlertVisible(true);
      setalertMessage({title:"Eliminado", message:"Hábito eliminado con éxito", screen: 'HabitHome'});
    } else {
      
    }
    setAlertVisible(true);
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
            editable={isEditing}
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
        <CustomAlert
          visible={alertVisible}
          title={alertMessage.title}
          message={alertMessage.message}
          onDismiss={() => setAlertVisible(false)}
          screen={alertMessage.screen}
        />
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
    backgroundColor: '#C1D7E1',
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
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    marginTop: 10,
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
      paddingRight: 30,
  },
  inputAndroid: {
      fontSize: 16,
      width: 260,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      color: '#333333',
      paddingRight: 30,
      backgroundColor: '#ffffff',
   },
});

export default EditHabitModal;
