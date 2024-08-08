import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DeleteUser, DetailsUser, UpdateUser } from '../../Apis/user';
import background from '../../../assets/background.jpg';
import globalStyles from '../../../assets/css/globalCss';
const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    const response = await UpdateUser(user.username, user.email, user.name, user.lastname, user.age);
    if(response){
      Alert.alert('Éxito', 'Usuario actualizado correctamente');
      setIsEditable(false);
    }
  };

  const handleDelete = async () => {
    const response  = await DeleteUser(user._id);
    if(response){
      Alert.alert('Éxito', 'Usuario eliminado correctamente');
      navigation.navigate('Login');
    }
  }

  return (
    <ImageBackground source={background} style={globalStyles.background}>
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
              style={[styles.modalButton, { backgroundColor: '#36c982' }]}
              onPress={() => {
                handleSave();
                setShowModal(false);
              }}
            >
              <Text style={styles.modalButtonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#75a3a3' }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.dangerZone}>
        <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.dangerButtonText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>¿Estás seguro de que quieres eliminar tu cuenta?</Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ff4d4d' }]}
              onPress={() => {
                handleDelete();
                setShowDeleteModal(false);
              }}
            >
              <Text style={styles.modalButtonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#75a3a3' }]}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1, 
    width: '80%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 23,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#6DACC8',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    width: '200',
  },
  dangerZone: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fff3f3',
    height: '100',
    borderColor: '#ffcccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  dangerZoneTitle: {
    fontSize: 18,
    width: '200',
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 16,
  },
  dangerButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 4,
  },
  dangerButtonText: {
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
    backgroundColor: '#C1D7E1',
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
