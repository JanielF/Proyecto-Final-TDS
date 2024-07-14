import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { DetailsUser } from '../../Apis/user';

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const userDetails = await DetailsUser(navigation);
    if (userDetails && userDetails.success) {
      setUser(userDetails.data);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://${ipv4}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      if (data.success) {
        setIsEditable(false);
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <TextInput
        style={styles.input}
        value={user.username}
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={user.email}
        editable={isEditable}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        value={user.name}
        editable={isEditable}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        value={user.lastname}
        editable={isEditable}
        onChangeText={(text) => setUser({ ...user, lastname: text })}
      />
      <TextInput
        style={styles.input}
        value={String(user.age)}
        editable={isEditable}
        onChangeText={(text) => setUser({ ...user, age: parseInt(text) })}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isEditable) {
            setShowModal(true);
          } else {
            setIsEditable(true);
          }
        }}
      >
        <Text style={styles.buttonText}>{isEditable ? 'Guardar' : 'Editar'}</Text>
      </TouchableOpacity>

      {isEditable && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditable(false)}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>¿Quieres guardar los cambios?</Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: 'green' }]}
              onPress={() => {
                handleSave();
                setShowModal(false);
              }}
            >
              <Text style={styles.modalButtonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: 'red' }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProfileScreen;
