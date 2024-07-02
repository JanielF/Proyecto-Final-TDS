import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CreateHabit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleCreateHabit = async () => {
        if (!name || !description || !frequency) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Token no encontrado');
                return;
            }

            const userId = ''; // Aquí deberías obtener el userId del contexto de usuario o almacenamiento

            const requestData = {
                name,
                description,
                frequency,
                userId
            };

            const response = await fetch(`http://10.0.0.15:3000/api/habits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            const responseData = await response.json();
            if (responseData.success) {
                Alert.alert('Éxito', 'Hábito creado correctamente');
                navigation.navigate('HomeHabitat'); // Navegar a la pantalla de HomeHabitat después de crear el hábito
            } else {
                Alert.alert('Error', responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nuevo Hábito</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del hábito</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del hábito"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descripción del hábito</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Escribe la descripción del hábito"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Frecuencia del hábito</Text>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{
                        label: 'Selecciona la frecuencia',
                        value: null,
                    }}
                    value={frequency}
                    onValueChange={(value) => setFrequency(value)}
                    items={[
                        { label: 'Diario', value: 'Diario' },
                        { label: 'Semanal', value: 'Semanal' },
                        { label: 'Mensual', value: 'Mensual' },
                    ]}
                />
            </View>

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateHabit}
                disabled={loading}
            >
                <Text style={styles.createButtonText}>
                    {loading ? 'Creando...' : 'Crear Hábito'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

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
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#333333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333333',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top', // Para alinear el texto en la parte superior en el campo de descripción multilinea
    },
    createButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateHabit;
